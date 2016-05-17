/**
 * Created by joseba on 19/2/16.
 */
"use strict";

let gl = undefined;
var _glRenderer = new (
    class GlRenderer {
        constructor( objectFactory ) {
            this.objectFactory = objectFactory;
            this.renderTarget = undefined;
        }

        draw( time, delta, viewport ){
            this.renderTarget = viewport.renderTarget;

        }

    })();

export { _glRenderer as glRenderer };