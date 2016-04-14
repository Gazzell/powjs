/**
 * Created by joseba on 17/3/16.
 */

"use strict";

var renderManager = new (
    class RenderManager {
        constructor( ){
            this.registeredRenderers = {};
            this.specializedRenderersMap = {};

            this._currentRenderer = undefined;
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

        draw( time, delta, viewport ){
            if( this.objectPool.has( objectType ) && this.typeConstructors.has( objectType ) ){
                let objectArray = this.objectPool.get( objectType );
                if(  objectArray.length > 0) {
                    return objectArray.pop();
                } else {
                    return new ( this.typeConstructors.get( objectType ) )( this, params );
                }
            }
        }
    })();

export { renderManager as default };
