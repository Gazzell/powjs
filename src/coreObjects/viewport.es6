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
        this._renderTarget = undefined;
        this._absolutePosition = undefined;
        this._scene = undefined;
        this._camera = undefined;
        this._renderer = undefined;
    }

    init( params ){
        this._mainSurfaceSize = this.objectFactory.create("Vector");
        this._rect = this.objectFactory.create("Rect");
        this._renderTarget = this.objectFactory.create("RenderTarget");
        this._absolutePosition = this.objectFactory.create("Vector");

        params.container.appendChild( this._renderTarget.canvas );

        if( params.totalWidth ){
            this._mainSurfaceSize.x = params.totalWidth;
        }
        if( params.totalHeight ){
            this._mainSurfaceSize.y = params.totalHeight;
        }
        if (params.rect !== undefined ){
            this.setRect( params.rect.x, params.rect.y, params.rect.w, params.rect.h );
        }

        // TODO: calculate inner size

        if( params.camera !== undefined  && params.camera instanceof pow.core.Camera){
            this._camera = params.camera;
        }
    }

    dispose(){
        this.objectFactory.dispose( this._rect );
        this.objectFactory.dispose( this._mainSurfaceSize );
        this.objectFactory.dispose( this._renderTarget );
        this.objectFactory.dispose( this._absolutePosition );
        this._rect = undefined;
        this._mainSurfaceSize = undefined;
        this._renderTarget = undefined;
        this._absolutePosition = undefinedError;
    }

    set renderer( renderer ){
        this._renderer = renderer;
    }
    get renderer(){
        return this._renderer;
    }

    setRect( x, y, w, h ){
        this._rect.set( x, y, w, h );
        this._renderTarget.resize( w * this._mainSurfaceSize.x, h * this._mainSurfaceSize.y );
        this._absolutePosition.set( x * this._mainSurfaceSize.x, y * this._mainSurfaceSize.y );
        //TODO: reposition renderTarget
    }
    set rect( rect ){
        this.setRect( rect.x, rect.y, rect.w, rect.h );
    }
    get rect(){
        return this._rect;
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
    resizeMain( width, height ){
        this._mainSurfaceSize.set( width, height );
        // force recalculation
        this.rect = this._rect;
    }
};

export { Viewport as default };
