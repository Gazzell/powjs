/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as FactoryObject } from "../factoryObject.jsx";

class BasicMaterial extends FactoryObject{
    constructor( objectFactory, params ){
        super( objectFactory );
        this._image = params.image | undefined;
    }
}

export {BasicMaterial as default };