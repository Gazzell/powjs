/**
 * Created by joseba on 19/2/16.
 */

"use strict";
import { default as Material } from "./material.es6";
import { basicShader as basicShader } from "./shaders/basicShader.es6";

var materials = {
    Material: Material,
    shaders: {
        basicShader: basicShader
    }
};

export { materials as default };