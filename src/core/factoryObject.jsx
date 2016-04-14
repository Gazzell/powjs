/**
 * Created by joseba on 17/2/16.
 */

"use strict";
class FactoryObject{
    constructor( objectFactory ){
        this.objectFactroy = objectFactory;
    }

    init( params ){}

    reset(){}
}

export { FactoryObject as default };