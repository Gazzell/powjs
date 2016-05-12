/**
 * Created by joseba on 14/4/16.
 */
"use strict";
import { default as FactoryObject } from "../factoryObject.es6";

class RenderTarget extends FactoryObject {
    constructor(objectFactory) {
        super(objectFactory);
        this.canvas = undefined;
    }

    init( params ){
        this.canvas = document.createElement('canvas');
    }

    resize( width, height ){
        this.canvas.width = width;
        this.canvas.height = height;
    }

    reset(){
        this.canvas = undefined;
    }
}

export { RenderTarget as RenderTarget };