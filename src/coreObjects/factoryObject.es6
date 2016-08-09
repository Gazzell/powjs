/**
 * Created by joseba on 17/2/16.
 */

"use strict";
class FactoryObject{
    constructor( objectFactory ){
        this.objectFactory = objectFactory;
    }

    init( params ){
        return this;
    }

    reset(){
        return this;
    }
}

export { FactoryObject as default };