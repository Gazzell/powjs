/**
 * Created by joseba on 17/2/16.
 */

"use strict";
class FactoryObject{
    constructor( objectFactory ){
        this.objectFactory = objectFactory;
    }

    init( params ){}

    dispose(){}
}

export { FactoryObject as default };