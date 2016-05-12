/**
 * Created by joseba on 17/3/16.
 */

"use strict";
import { default as renderer } from "./renderer/glRenderer.es6";

var renderManager = new (
    class RenderManager {
        constructor( ){
            this._renderer = undefined;
        }

        registerRenderer( renderer ){
            if( renderer !== undefined ) {
                if (this.registeredRenderers[ renderer.name ] !== undefined) {
                    console.warn('Renderer ${renderer.name} already registered.');
                } else {
                    this.registeredRenderers[ renderer.name ] = renderer;
                }
            }
        }

        registerSpecializedRenderer( rendererName, specializedRenderer ){
            if( specializedRenderer !== undefined ) {
                if (this.registeredRenderers[ rendererName ] === undefined) {
                    console.warn('Could not register specialized renderer ${specializedRenderer.name}. Renderer ${rendererName} not registered.');
                } else {
                    this.registeredRenderers[ rendererName ].registerSpecializedRenderer( specializedRenderer );
                }
            }
        }

        draw( time, delta, viewport, camera, root ){
            if( root.renderer === undefined ){

            }
        }
    })();

export { renderManager as default };
