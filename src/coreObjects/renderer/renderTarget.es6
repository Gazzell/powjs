/**
 * Created by joseba on 14/4/16.
 */
"use strict";
import { default as FactoryObject } from "../factoryObject.es6";

class RenderTarget extends FactoryObject {
    constructor(objectFactory) {
        super(objectFactory);
        this.canvas = undefined;
        this.glContext = undefined;
        this.width = 0;
        this.height = 0;
    }

    init( params ){
        this.canvas = document.createElement('canvas');
        this.glContext = this.canvas.getContext("experimental-webgl");
        return this;
    }

    resize( width, height ){
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        return this;
    }

    reset(){
        this.canvas = undefined;
        return this;
    }
}

export { RenderTarget as default };