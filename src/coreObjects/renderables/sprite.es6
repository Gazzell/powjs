/**
 * Created by joseba on 16/2/16.
 */

"use strict";
import { default as FactoryObject } from "../factoryObject.es6";
import { SceneObject as SceneObject } from "./sceneObject.es6";

class AnimationFrame extends FactoryObject {
    constructor( objectFactory ){
        super( objectFactory );
        this.rect = objectFactory.create('Rect');
        this.duration = 0;
    }

    init( params ){
        if( params !== undefined ){
        }
    }

    reset(){
        this.rect.reset();
        this.duration = 0;
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
        this.type = "Sprite";
        this._spriteDef = undefined;
        this._material = undefined;
        this._surface = undefined;
        this._surfaceId = undefined;
        this._spriteSheet = undefined;
        this._rect = undefined;
        this._fps = 0;
        this._currentFrame = 0;
        this._totalDuration = 0;
        this._offset = undefined;
    }

    init( params ){
        this._rect = this.objectFactory.create( "Rect" );
        this._offset = this.objectFactory.create( "Vector" );
        if( params !== undefined ){
            if( params.image !== undefined ){
                this.spriteSheet = params.image;
            }
        }
        return this;
    }

    reset(){
        this.objectFactory.dispose( this._rect );
        this.objectFactory.dispose( this._offset );
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

    set spriteSheet( spriteSheetId ){
        this._spriteSheet = pow.engine.resourceManager.getResource( spriteSheetId );
        if( this._spriteSheet !== undefined ) {
            this._surfaceId = spriteSheetId;
            this._surface = this._spriteSheet;
            if( this._spriteDef === undefined ){
                this._w = this._surface.width;
                this._h = this._surface.height;
            }
        }
    }

    get spriteSheet(){
        return this._spriteSheet;
    }

    get surface(){
        return this._surface;
    }

    get surfaceId(){
        return this._surfaceId;
    }

    update( time, delta ){
        super.update( time, delta );
    }
}

export { Sprite as Sprite };
export { AnimationFrame as AnimationFrame };
export { Animation as Animation };