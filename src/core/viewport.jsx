/**
 * Created by joseba on 12/12/15.
 */
"use strict";
import { default as FactoryObject } from "./factoryObject.jsx";

class Viewport extends FactoryObject {
    constructor( objectFactory, params ){
        super( objectFactory );
        this._renderer = undefined;
        this._rect = this.objectFactory.create("Rect");
        this._renderTarget = document.createElement('canvas');

        // force render target and rect initialization
        this.renderer = params.renderer | undefined;
        if (params.rect !== undefined ){
            this.setRect( rect.x, rect.y, rect.w, rect.h );
        }
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