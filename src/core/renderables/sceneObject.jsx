/**
 * Created by joseba on 14/1/16.
 */

"use strict";

class SceneObject {
    constructor( objectFactory, params ){
        this.type = 'SceneObject';
        this.objectFactory = objectFactory;
        this._position = objectFactory.create("Vector");
        this._rotation = 0;
        this._scale = objectFactory.create("Vector").set(1, 1);
        this._pivot = objectFactory.create("Vector");

        this.children = new Set();

        this._transformMatrix = objectFactory.create("Matrix3");
        this._boundingRect = objectFactory.create("Rect");
        this._dirty = true;
    }

    reset(){
        this._position.reset();
        this._rotation = 0;
        this._scale.set( 1, 1 );
        this._pivot.reset();

        this._transformMatrix.reset();
        this._boundingRect.reset();

        this.children.forEach( child => this.objectFactory.dispose( child ) );
    }

    set position( pos ){
        this._position = pos;
        this._dirty = true;
    }
    get position(){
        return this._position;
    }

    update(){

    }
}

export { SceneObject as default };