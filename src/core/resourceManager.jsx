"use strict";
import * as utils from "../utils/utils.jsx";
var resourceManager = new(
    class ResourceManager {
        constructor( objectFactory ){
            this._objectFactory = objectFactory;
            this._resources = {};
            this._resourcesById = {};
            this._resourceTypes = {};
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

        obtainResource( url, id, type ){
            return new Promise( ( resolve, reject ) => {
                let fireOnResObtained = function fireOnResObtained ( resource, warnMessage ){
                    if( warnMessage !== undefined ){
                        console.warn( warnMessage );
                    }
                    resolve( resource );
                };

                if( id !== undefined ){
                    if( this._resourcesById[ id ] !== undefined ){
                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: ID ${id} already in use." );
                    } else if( this._resourceTypes[ type ] === undefined ) {
                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: TYPE ${type} not registered for resource ${id} ( ${url} )." );
                    } else {
                        if( this._resourceTypes[ type ].download === undefined ){
                            // download
                            let p = fetch( url )
                                .then(
                                    response => {
                                        if (response.status >= 200 && response.status < 300) {
                                            this._resourceTypes[ type ].parse( response )
                                                .then( resource => {
                                                    if( this._resources[ type ] === undefined ){
                                                        this._resources[ type ] = {};
                                                    }
                                                    this._resources[ type ][ id ] = resource;
                                                    fireOnResObtained( resource );
                                                })
                                                .catch(
                                                    e => {
                                                        fireOnResObtained( undefined, "Pow ResourceManager - obtainResource: There was an error parsing resource ${id} ( ${url} ): ${e} " );
                                                    }
                                                );

                                        } else {
                                            var error = new Error(response.statusText);
                                            error.response = response;
                                            throw error;
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
    })();

export { resourceManager as default };