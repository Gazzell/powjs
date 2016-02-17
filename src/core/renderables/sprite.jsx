/**
 * Created by joseba on 16/2/16.
 */

"use strict";
import { default as FactoryObject } from "../factoryObject.jsx";
import { SceneObject as SceneObject } from "./sceneObject.jsx";

class SpriteFrame extends FactoryObject {
    constructor( objectFactory, params ){
        super( objectFactory );
        this.rect = objectFactory.create('Rect');
        this.duration = duration;
    }

    reset(){
        
    }
}

class Animation extends FactoryObject{
    constructor( objectFactory, params ){
        super( objectFactory );
        this.frames = new Set();
        this.frameCount = 0;
        this.currentFrame = 0;
    }

    reset(){
        this.frameCount = 0;
        this.currentFrame = 0;
        this.frames.forEach( frame => this.objectFactory.dispose( frame ) );
        this.frames.clear();
    }


}

class Sprite extends SceneObject{
    constructor( objectFactory, params ){
        super( objectFactory, params );
        this._spriteDef = undefined;
        this._material = undefined;
        this._spriteSheet = undefined;
        this._rect = objectFactory.create( "Rect" );
        this._fps = 0;
        this._currentFrame = 0;
        this._totalDuration = 0;
    }

    reset(){
        super.reset();
    }

    set material( material ){
        this._material = material;
        this._dirty = true;
    }

    get material( ){
        return this._material;
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
export { Animation as Animation };