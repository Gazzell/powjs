/**
 * Created by joseba on 14/1/16.
 */

"use strict";
import { SceneObject as SceneObject } from "./sceneObject.jsx";
import { AnchorTypes as AnchorTypes } from "./sceneObject.jsx";
import { Sprite as Sprite } from "./sprite.jsx";
import { AnimationFrame as AnimationFrame } from "./sprite.jsx";
import { Animation as Animation } from "./sprite.jsx";

var renderables = {
    SceneObject: SceneObject,
    Sprite: Sprite,
    AnimationFrame: AnimationFrame,
    Animation: Animation,
    AnchorTypes: AnchorTypes
};
export { renderables as default };