/**
 * Created by joseba on 16/2/16.
 */

"use strict";
import { SceneObject as SceneObject } from "./sceneObject.jsx";

class SpriteFrame {
    constructor( rect, duration ){
        this.rect = rect;
        this.duration = duration;
    }
}

class Animation{
    constructor( objectFactory, params ){
        this.objectFactory = objectFactory;
        this.frames = new Set();
        this.frameCount = 0;
        this.currentFrame = 0;
    }

    reset(){

    }
}

class Sprite extends SceneObject{
    constructor( objectFactory, params ){
        super( objectFactory, params );
        this._spriteDef = undefined;
        this._spriteSheet = undefined;
        this._rect = objectFactory.create( "Rect" );
        this._fps = 0;
        this._currentFrame = 0;
        this._totalDuration = 0;
    }

    set image( image ){

    }

    get image( ){
        return this._image;
    }

    set fps( fps ){
        this._fps = fps;
        this._dirty = true;
    }

    get fps(){
        return this._fps;
    }

    set frame( frame ){
        this._currentFrame = frame;
        this._dirty = true;
    }

    get frame(){
        return this._currentFrame;
    }

    get duration(){
        return this._totalDuration;
    }
}

export { Sprite as Sprite };
export { SpriteFrame as SpriteFrame };