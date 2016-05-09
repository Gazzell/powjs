/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as FactoryObject } from "../factoryObject.es6";

class RenderPass extends FactoryObject{
    constructor( objectFactory, params ){
        super( objectFactory );
        this._renderTarget = undefined;
        this._material = undefined;
    }

    init( params ){
        this._renderTarget = params.renderTarget;
        this._material = params.material;
    }
}

export { RenderPass as default };