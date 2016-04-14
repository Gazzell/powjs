/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as FactoryObject } from "../factoryObject.jsx";
import { default as GlShader } from "./gl/glShader.jsx";

class RenderPass extends FactoryObject{
    constructor( objectFactory, params ){
        super( objectFactory );
        this._renderTarget = params.renderTarget | undefined;
    }
}

export { RenderPass as default };