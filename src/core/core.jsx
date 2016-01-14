/**
 * Created by joseba on 10/12/15.
 */
"use strict";
import { default as ResourceManager } from "./resourceManager.jsx";
import { default as ObjectFactory } from "./objectFactory.jsx";
import { default as renderables } from "./renderables/renderables.jsx";

var core = {
    ResourceManager: ResourceManager,
    ObjectFactory: ObjectFactory,
    renderables: renderables
};
export { core as default };