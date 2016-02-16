/**
 * Created by joseba on 14/1/16.
 */

"use strict";
import { SceneObject as SceneObject } from "./sceneObject.jsx";
import { AnchorTypes as AnchorTypes } from "./sceneObject.jsx";
import { Sprite as Sprite } from "./sprite.jsx";
import { SpriteFrame as SpriteFrame } from "./sprite.jsx";

var renderables = {
    SceneObject: SceneObject,
    Sprite: Sprite,
    SpriteFrame: SpriteFrame,
    constants: {
        AnchorTypes: AnchorTypes
    }
};
export { renderables as default };