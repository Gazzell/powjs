/**
 * Created by joseba on 12/12/15.
 */
"use strict";
import { default as FactoryObject } from "./factoryObject.es6";

class Viewport extends FactoryObject {
    constructor( objectFactory ){
        super( objectFactory );
        this._renderer = undefined;
        this._rect = this.objectFactory.create("Rect");
        this._renderTarget = document.createElement('canvas');
        this._scene = undefined;
        this._camera = undefined;
        this._rendererSize = unedfined;


        // force render target and rect initialization
        this.renderer = params.renderer | undefined;

    }

    init( params ){
        this._rendererSize = this.objectFactroy.create("Vector2", params.rendererSize );

        if (params.rect !== undefined ){
            this.setRect( rect.x, rect.y, rect.w, rect.h );
        }
        if( params.camera !== undefined ){
            if( !params.camera instanceof pow.core.Camera ){
                this._camera = this.objectFactory.create('Camera', params.camera );
            } else {
                this._camera = params.camera;
            }
        }
    }

    dispose(){
        this.objectFactroy.dispose( this._rendererSize );
        this._rendererSize = undefined;
    }

    draw( time, delta, node, camera ){
        if( renderer !== undefined && camera.rect.intersects( this.rect ) ){
            renderer.draw( time, delta, this, camera, node );
        }
    }

    set renderer( renderer ){
        this._renderer = renderer;
        if ( this._renderer !== undefined ){
            this._renderer.initRenderTarget( this._renderTarget );
        }
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

    set camera( camera ){
        this._camera = camera;
    }

    get camera(){
        return this._camera;
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
