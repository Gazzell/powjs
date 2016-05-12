/**
 * Created by joseba on 10/12/15.
 */
"use strict";
import { default as FactoryObject } from "./factoryObject.es6";
import { default as Viewport } from "./viewport.es6";
import { default as Camera } from "./camera.es6";
import { default as renderables } from "./renderables/renderables.es6";
import { default as math } from "./math/math.es6"
import { default as renderer } from "./renderer/renderer.es6";
import { default as materials } from "./materials/materials.es6";

var core = {
    renderables: renderables,
    renderer: renderer,
    materials: materials,
    math: math,
    FactoryObject: FactoryObject,
    Viewport: Viewport,
    Camera: Camera
};
export { core as default };
