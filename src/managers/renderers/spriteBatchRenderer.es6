/**
 * Created by joseba on 19/2/16.
 */
"use strict";

let gl = undefined;
class SpriteBatchRendererClass {
    constructor( defaultViewport ) {
        this.renderTarget = undefined;
        this.shader = undefined;
        //gl = defaultViewport.renderTarget.getContext("experimental-webgl");
    }

    draw( time, delta, viewport ){
        this.renderTarget = viewport.renderTarget;
        if( gl === undefined ){
            gl = this.renderTarget.glContext;
        }
    }

}

export { SpriteBatchRendererClass as SpriteBatchRenderer };