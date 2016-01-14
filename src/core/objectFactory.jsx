/**
 * Created by joseba on 14/1/16.
 */
"use strict";

class ObjectFactory {
    constructor( ){
        this.objectPool = new Map();
        this.typeConstructors = new Map();
    }

    static registerObjectType( typeName, constructor ){
        if( !this.objectPool.has( typeName ) ){
            this.objectPool.set( typeName, [] );
        }
        if( !this.typeConstructors.has( typeName ) ){
            this.typeConstructors.set( typeName, constructor );
        }
    }

    static create( objectType ){
        if( this.objectPool.has( object.type && this.typeConstructors.has( object.type ) ) ){
            let objectArray = this.objectPool.get( object.type );
            if(  objectArray.length > 0) {
                return objectArray.pop();
            } else {
                return new this.typeConstructors.get( objectType )();
            }
        }
    }

    static free( object ){
        if( this.objectPool.has( object.type ) ){
            object.init();
            this.objectPool.get( object.type ).push( object );
        }
    }
}

export { ObjectFactory as default };