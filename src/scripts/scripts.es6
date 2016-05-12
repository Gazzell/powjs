/**
 * Created by joseba on 12/05/2016.
 */

"use strict";
import { default as loaders } from "./loaders/loaders.es6";
import { default as materials } from "./materials/materials.es6";

var scripts = {
    loaders: loaders,
    materials: materials
};

export { scripts as default };
