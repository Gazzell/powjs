/**
 * Created by joseba on 10/12/15.
 */
"use strict";
import { default as resourceManager } from "./resourceManager.jsx";
import { default as viewport } from "./viewport.jsx";
import { default as objectFactory } from "./objectFactory.jsx";
import { default as renderables } from "./renderables/renderables.jsx";
import { default as math } from "./math/math.jsx"
import { default as renderer } from "./renderer/renderer.jsx";
import { default as materials } from "./materials/materials.jsx";

var core = {
    resourceManager: resourceManager,
    objectFactory: objectFactory,
    renderables: renderables,
    renderer: renderer,
    materials: materials,
    math: math,
    Viewport: viewport
};
export { core as default };