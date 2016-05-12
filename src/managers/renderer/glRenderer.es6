/**
 * Created by joseba on 19/2/16.
 */
"use strict";

let gl = undefined;
var glRenderer = new (
    class GlRenderer {
        constructor( objectFactory ) {
            this.objectFactory = objectFactory;
            this.renderTarget = undefined;
        }

        draw( time, delta, viewport, camera, node ){
            this.renderTarget = viewport.renderTarget;

        }

    })();

export { glRenderer as glRenderer };