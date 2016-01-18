/**
 * Created by joseba on 12/12/15.
 */
"use strict";

var renderManager = new (
    class RenderManager {
        constructor( params ){
            this._scene = undefined;
        }

        get scene(){ return this._scene; }
        set scene( value ){

        }
    })();

export { renderManager as default };