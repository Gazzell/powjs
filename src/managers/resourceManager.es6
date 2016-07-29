"use strict";
var resourceManager = new(
    class ResourceManager {
        constructor( objectFactory ){
            this._objectFactory = objectFactory;
            this._resources = {};
            this._resourcesById = {};
            this._resourceTypes = {};
        }

        registerResourceTypes( typeDescriptors ){
            for( var key in typeDescriptors ){
                if( typeDescriptors.hasOwnProperty( key ) ){
                    this.registerResourceType( typeDescriptors[ key ] );
                }
            }
        }

        registerResourceType( typeDescriptor ){
            if( typeDescriptor.type === undefined ){
                console.warn( "Pow ResourceManager - registerResourceType: Invalid type descriptor. Descriptors must have a 'type' key." );
            } else if( this._resourceTypes[ typeDescriptor.type ] !== undefined ){
                console.warn( "Pow ResourceManager - registerResourceType: TYPE ${type} already registered." );
            } else if( typeDescriptor.parse === undefined) {
                console.warn( "Pow ResourceManager - registerResourceType: Parse function can be undefined for type ${typeDescriptor.type}." );
            } else {
                this._resourceTypes[ typeDescriptor.type ] = typeDescriptor;
            }
        }

        addResource( id, type, resource ){
            if( this._resourcesById[ id ] !== undefined ){
                console.warn( "Pow ResourceManager - addResource: ID ${id} already in use." );
            } else {
                if (this._resources[ type ] === undefined) {
                    this._resources[ type ] = {};
                }
                this._resources[ type ][ id ] = resource;
                this._resourcesById[ id ] = resource;
            }
        }

        removeResource( id, type ){
            if( this._resourcesById[ id ] === undefined || this._resources[ type ] === undefined || this._resources[ type ][ id ] === undefined ){
                console.warn( "Pow ResourceManager - removeResource: resource ID ${id} TYPE ${type} not found." );
            } else {
                this._resourcesById[ id ] = undefined;
                this._resources[ type ][ id ] = undefined;
            }
        }

        downloadResource(url, id, type){
            var that = this;
            return new Promise( ( resolve, reject ) => {
                let fireOnResObtained = function fireOnResObtained ( resource, warnMessage ){
                    if( warnMessage !== undefined ){
                        console.warn( warnMessage );
                    }
                    resolve( resource );
                };

                if( id !== undefined ){
                    if( that._resourcesById[ id ] !== undefined ){
                        fireOnResObtained( that._resourcesById[ id ], "Pow ResourceManager - obtainResource: ID ${id} already in use." );
                    } else if( that._resourceTypes[ type ] === undefined ) {
                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: TYPE ${type} not registered for resource ${id} ( ${url} )." );
                    } else {
                        if( that._resourceTypes[ type ].download === undefined ){
                            // download
                            let p = fetch( url )
                                .then(
                                    response => {
                                        if (response.status >= 200 && response.status < 300) {
                                            that._resourceTypes[ type ].parse( response )
                                                .then( resource => {
                                                    if( that._resources[ type ] === undefined ){
                                                        that._resources[ type ] = {};
                                                    }
                                                    that._resources[ type ][ id ] = resource;
                                                    that._resourcesById[ id ] = resource;
                                                    fireOnResObtained( resource );
                                                })
                                                .catch(
                                                    e => {
                                                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: There was an error parsing resource ${id} ( ${url} ): ${e} " );
                                                    }
                                                );

                                        } else {
                                            fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: " + response.statusText);
                                        }
                                    },
                                    err => {
                                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: There was an error obtaining resource ${id} ( ${url} ): ${err} " );
                                    })
                                .catch(
                                    e => {
                                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: There was an error obtaining resource ${id} ( ${url} ): ${e} " );
                                    }
                                );


                        }
                    }
                }
            });

        }

        getResource( id ){
            if( this._resourcesById[ id ] ){
                return this._resourcesById[ id ];
            }
            return undefined;
        }

    })();

export { resourceManager as default };
