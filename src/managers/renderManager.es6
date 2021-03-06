/**
 * Created by joseba on 17/3/16.
 */

"use strict";
import { default as renderers } from "./renderers/renderers.es6";

var renderManager = new (
    class RenderManager {
        constructor( ){
            let defaultViewportParams =
            this._objectFactory = undefined;
            this._viewports = new Map();
            this.preUpdateCallbacks = new Set();
            this.postUpdateCallbacks = new Set();
            this.preDrawCallbacks = new Set();
            this.postDrawCallbacks = new Set();
            this.registeredRenderers = new Map();
        }

        init( objectFactory, params  ){
            this._objectFactory = objectFactory;

            let defaultViewport = this._objectFactory.create("Viewport",
                {
                    rect: { x: 0, y:0, w:1, h:1 },
                    totalWidth: params.width || 800,
                    totalHeight: params.height || 600,
                    container: params.container
                }
            );
            this._viewports.set( "default", defaultViewport );
            Object.keys( renderers ).forEach( rendererName => this.registerRenderer( rendererName,
                new renderers[ rendererName ]( objectFactory, this._viewports.get( "default" ) ) ) );

            this._viewports.get( "default").renderer = this.registeredRenderers.get("SpriteBatchRenderer");
        }

        registerRenderer( name, renderer ){
            if( !this.registeredRenderers.has( name ) ){
                this.registeredRenderers.set( name, renderer );
            }
        }

        _chooseList( cbkType ){
            switch (cbkType){
                case "preUpdate":
                    return this.preUpdateCallbacks;
                case "postUpdate":
                    return this.postUpdateCallbacks;
                case "preDraw":
                    return this.preDrawCallbacks;
                case "postDraw":
                    return this.postDrawCallbacks;
                default:
                    return undefined;
            }
        }

        _fireCallbacks( cbkSet, time, delta ){
            cbkSet.forEach( element => element( time, delta ) );
        }

        registerCallback( cbkType, callback ){
            let cbkList = this._chooseList( cbkType );
            if( cbkList !== undefined && !cbkList.has(callback) ){
                cbkList.add( callback );
            }
        }

        unregisterCallback( cbkType, callback ){
            let cbkList = this._chooseList( cbkType);
            if( cbkList !== undefined ){
                cbkList.delete(callback);
            }
        }

        addViewport( name, viewport ){
            if( !this._viewports.has( name ) ){
                viewport.renderManager = this;
                this._viewports.set( name, viewport );
            }
        }

        removeViewport( name ){
            if( this._viewports.has( name ) ) {
                this._viewports.get(name).renderManager = undefined;
                this._viewports.delete(name);
            }
        }

        setViewportScene( viewportName, scene ){
            if( this._viewports.has( viewportName ) ){
                this._viewports.get( viewportName ).scene = scene;
            }
        }

        updateAndDraw( time, delta ){
            // Update
            this._fireCallbacks( this.preUpdateCallbacks, time, delta );
            this._viewports.forEach( viewport => viewport.update( time, delta ) );
            this._fireCallbacks( this.postUpdateCallbacks, time, delta );

            // Render
            this._fireCallbacks( this.preDrawCallbacks, time, delta );
            this._viewports.forEach( viewport => viewport.draw( time, delta ) );
            this._fireCallbacks( this.postDrawCallbacks, time, delta );
        }

        resize( width, height ){
            this._viewports.forEach( viewport => viewport.resizeMain( width, height ) );
        }
    })();

export { renderManager as default };
