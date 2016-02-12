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
        this._scale = objectFactory.create("Vector");
        this._scale.set(1, 1);
        this._pivot = objectFactory.create("Vector");

        this.children = [];

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

    set rotation( rotation ){
        this._rotation = rotation;
        this._dirty = true;
    }

    get rotation(){
        return this._rotation;
    }

    set scale( scale ){
        this._scale = scale;
        this._dirty = true;
    }

    get scale(){
        return this._scale;
    }

    addChild( child, index = -1 ){
        if( index !== -1 && index < this.children.length - 1){
            this.children.splice( index, 0, child );
        } else {
            this.children.push( child );
        }
    }

    update( parentTransform ){

    }
}

export { SceneObject as default };