/**
 * Created by joseba on 19/2/16.
 */

"use strict";
import {default as GlShader} from "./glShader.es6";
import {default as RenderTarget} from "./renderTarget.es6";

var renderer = {
    GlShader: GlShader,
    RenderTarget: RenderTarget
};

export { renderer as default };
