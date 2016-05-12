/**
 * Created by joseba on 14/1/16.
 */
"use strict";

var objectFactory = new (
    class ObjectFactory {
        constructor( ){
            this.objectPool = new Map();
            this.typeConstructors = new Map();
        }

        registerObjects( objects ){
            for( var key in objects ){
                if( objects.hasOwnProperty( key ) ){
                    if( ObjectFactory.isFactorizableClass( objects[ key ]) && key !== 'FactoryObject' ){
                        this.registerObjectType( key, objects[ key ] );
                    } else {
                        this.registerObjects( objects[ key ] );
                    }
                }
            }
        }

        registerObjectType( typeName, constructor ){
            if( !this.objectPool.has( typeName ) ){
                this.objectPool.set( typeName, [] );
            }
            if( !this.typeConstructors.has( typeName ) ){
                this.typeConstructors.set( typeName, constructor );
            }
        }

        create( objectType, params ){
            var obj;
            if( this.objectPool.has( objectType ) && this.typeConstructors.has( objectType ) ){
                let objectArray = this.objectPool.get( objectType );
                if(  objectArray.length > 0) {
                    obj = objectArray.pop();
                } else {
                    obj = new ( this.typeConstructors.get( objectType ) )( this );
                }
                obj.init( params );
                return obj;
            }
        }

        dispose( object ){
            if( this.objectPool.has( object.type ) ){
                object.reset();
                this.objectPool.get( object.type ).push( object );
            }
        }

        static isFactorizableClass( classToCheck ){
            let found = false,
                proto = Object.getPrototypeOf( classToCheck );
            while( proto !== null && !found){
                if( proto.name !== 'FactoryObject'){
                    proto = Object.getPrototypeOf( proto );
                } else {
                    found = true;
                }
            }
            return found;
        }

    })();

export { objectFactory as default };
