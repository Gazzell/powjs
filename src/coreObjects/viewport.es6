/**
 * Created by joseba on 12/12/15.
 */
"use strict";
import { default as FactoryObject } from "./factoryObject.es6";

class Viewport extends FactoryObject {
    constructor( objectFactory ){
        super( objectFactory );
        this.renderManager = undefined;
        this._rect = undefined;
        this.renderTarget = undefined;
        this._scene = undefined;
        this._camera = undefined;
        this._innerSize = undefined;
        this._renderer = undefined;
    }

    init( params ){
        this._rect = this.objectFactory.create("Rect");
        if (params.rect !== undefined ){
            this.setRect( params.rect.x, params.rect.y, params.rect.w, params.rect.h );
        }
        this._innerSize = this.objectFactory.create("Vector2");
        // TODO: calculate inner size

        if( params.camera !== undefined  && params.camera instanceof pow.core.Camera){
            this._camera = params.camera;
        }
        this.renderTarget = document.createElement('canvas');
    }

    dispose(){
        this.objectFactroy.dispose( this._rect );
        this.objectFactroy.dispose( this._innerSize );
        this._rect = undefined;
        this._rendererSize = undefined;
        this.renderTarget = undefined;
    }

    set renderer( renderer ){
        this._renderer = renderer;
    }
    get renderer(){
        return this._renderer;
    }

    setRect( x, y, w, h ){
        this._rect.set( x, y, w, h );
    }
    set rect( rect ){
        this._rect.copy( rect );
    }
    get rect(){
        return this._rect;
    }

    get innerSize(){
        return this._innerSize;
    }

    set camera( camera ){
        this._camera = camera;
    }

    get camera(){
        return this._camera;
    }

    get scene(){
        return this._scene;
    }

    set scene( scene ){
        this._scene = scene;
    }

    update( time, delta ){
        if( this._scene !== undefined ){
            this._scene.update( time, delta );
        }
    }

    draw( time, delta ){
        this._renderer.draw( time, delta, this );
    }

    /**
     * Handle game resize event
     * @param {number} width
     * @param {number} height
     */
    resize( width, height ){
        // force recalculation
        this.rect = this._rect;
    }
};

export { Viewport as default };
