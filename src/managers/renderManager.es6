/**
 * Created by joseba on 17/3/16.
 */

"use strict";
import { default as renderer } from "./renderer/glRenderer.es6";

var renderManager = new (
    class RenderManager {
        constructor( ){
            this._renderer = undefined;
            this._viewports = [];
            this.preUpdateCallbacks = [];
            this.postUpdateCallbacks = [];
            this.preRenderCallbacks = [];
            this.posrRenderCallbacks = [];
        }

        _chooseList( cbkType ){
            switch (cbkType){
                case "preUpdate":
                    return this.preUpdateCallbacks;
                case "postUpdate":
                    return this.postUpdateCallbacks;
                case "preDraw":
                    return this.postUpdateCallbacks;
                case "postDraw":
                    return this.postUpdateCallbacks;
                default:
                    return undefined;
            }
        }

        _fireCallbacks( cbkList, time, delta ){
            for( let i = 0; i < cbkList.length; i++){
                cbkList[i]( time, delta );
            }
        }

        registerCallback( cbkType, callback ){
            let cbkList = this._chooseList( cbkType );
            if( cbkList !== undefined && cbkList.indexOf(callback) === -1 ){
                cbkList.push( callback );
            }
        }

        unregisterCallback( cbkType, callback ){
            let cbkList = this._chooseList( cbkType);
            let index;
            if( cbkList !== undefined ){
                index = cbkList.indexOf(callback);
                if( index !== -1 ) {
                    cbkList.splice(index, 1);
                }
            }
        }

        addViewport( viewport ){
            if( this._viewports.indexOf( viewport ) === -1 ){
                this._viewports.push( viewport );
            }
        }
        removeViewport( viewport ){
            let index = this._viewports.indexOf( viewport );
            if( index !== -1 ){
                this._viewports.slice( index, 1 );
            }
        }

        updateAndDraw( time, delta ){
            for( var i = 0; i < this._viewports.length; i++ ){
                // Update
                this._fireCallbacks( this.preUpdateCallbacks, time, delta );
                this._viewports[i].update( time, delta );
                this._fireCallbacks( this.postUpdateCallbacks, time, delta );

                // Render
                this._fireCallbacks( this.preDrawCallbacks, time, delta );
                this._renderer.draw( time, delta, this._viewports[i] );
                this._fireCallbacks( this.postDrawCallbacks, time, delta );
            }
        }
    })();

export { renderManager as default };
