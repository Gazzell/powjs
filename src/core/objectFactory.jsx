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
                    this.registerObjectType( key, objects[ key ] );
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
            if( this.objectPool.has( objectType ) && this.typeConstructors.has( objectType ) ){
                let objectArray = this.objectPool.get( objectType );
                if(  objectArray.length > 0) {
                    return objectArray.pop();
                } else {
                    return new ( this.typeConstructors.get( objectType ) )( this, params );
                }
            }
        }

        dispose( object ){
            if( this.objectPool.has( object.type ) ){
                object.reset();
                this.objectPool.get( object.type ).push( object );
            }
        }
    })();

export { objectFactory as default };