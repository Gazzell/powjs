/**
 * Created by joseba on 10/12/15.
 */
"use strict";
import { default as resourceManager } from "./resourceManager.jsx";
import { default as renderManager } from "./renderManager.jsx";
import { default as objectFactory } from "./objectFactory.jsx";
import { default as renderables } from "./renderables/renderables.jsx";
import { default as math } from "./math/math.jsx"

var core = {
    resourceManager: resourceManager,
    renderManager: renderManager,
    objectFactory: objectFactory,
    renderables: renderables,
    math: math
};
export { core as default };