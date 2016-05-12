/**
 * Created by joseba on 14/1/16.
 */

"use strict";
import { SceneObject as SceneObject } from "./sceneObject.es6";
import { AnchorTypes as AnchorTypes } from "./sceneObject.es6";
import { Sprite as Sprite } from "./sprite.es6";
import { AnimationFrame as AnimationFrame } from "./sprite.es6";
import { Animation as Animation } from "./sprite.es6";

var renderables = {
    SceneObject: SceneObject,
    Sprite: Sprite,
    AnimationFrame: AnimationFrame,
    Animation: Animation,
    AnchorTypes: AnchorTypes
};
export { renderables as default };