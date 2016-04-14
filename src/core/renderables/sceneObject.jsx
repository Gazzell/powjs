/**
 * Created by joseba on 14/1/16.
 */

"use strict";
import { default as FactoryObject } from "../factoryObject.jsx";

const AnchorTypes = {
        "TOP_LEFT": 0,
        "TOP_CENTER": 1,
        "TOP_RIGHT": 2,
        "CENTER_LEFT": 3,
        "CENTER": 4,
        "CENTER_RIGHT": 5,
        "BOTTOM_LEFT": 6,
        "BOTTOM_CENTER": 7,
        "BOTTOM_RIGHT": 8,
        "CUSTOM": 9
    };

class SceneObject extends FactoryObject{
    constructor( objectFactory ){
        super( objectFactory );
        this.type = 'SceneObject';
        this._lastUpdateTime = -1;
        this._position = objectFactory.create("Vector");
        this._rotation = 0;
        this._scale = objectFactory.create("Vector");
        this._scale.set(1, 1);
        this._alpha = 1.0;
        this._w = 0;
        this._h = 0;
        this._pivot = objectFactory.create("Vector");
        this._parent = undefined;

        this.children = [];

        this._transformMatrix = objectFactory.create("Matrix3");
        this._worldTransform = objectFactory.create("Matrix3");
        this._worldAlpha = 1.0;
        this._boundingRect = objectFactory.create("Rect");
        this._dirty = true;
        this._dirtyTransform = true;

        // pre & post hooks
        this._preUpdateCbks = [];
        this._postUpdateCbks = [];
        this._preDrawCbks = [];
        this._postDrawCbks = [];
    }

    init( params ){

    }

    reset(){
        this._position.reset();
        this._rotation = 0;
        this._scale.set( 1, 1 );
        this._alpha = 1.0;
        this._pivot.reset();

        this._transformMatrix.reset();
        this._boundingRect.reset();

        this.children.forEach( child => this.objectFactory.dispose( child ) );
        this.children.length = 0;

        this._parent = undefined;
        this._dirty = true;
        this._dirtyTransform = true;

        this._preDrawCbks.length = 0;
        this._postDrawCbks.length = 0;
    }

    set position( pos ){
        this._position = pos;
        this._dirty = true;
        this._dirtyTransform = true;
    }
    get position(){
        return this._position;
    }

    set rotation( rotation ){
        this._rotation = rotation;
        this._dirty = true;
        this._dirtyTransform = true;
    }

    get rotation(){
        return this._rotation;
    }

    set scale( scale ){
        this._scale = scale;
        this._dirty = true;
        this._dirtyTransform = true;
    }

    get scale(){
        return this._scale;
    }

    set alpha( alpha ){
        this._alpha = alpha;
        this._dirty = true;
    }

    get alpha(){
        return this._alpha;
    }

    get boundingRect(){
        return this._boundingRect;
    }

    addChild( child, index = -1 ){
        if( index !== -1 && index < this.children.length - 1){
            this.children.splice( index, 0, child );
        } else {
            child._parent = this;
            this.children.push( child );
        }
    }

    update( time, delta ){
        // update only once in a frame
        if( time > this._lastUpdateTime ) {
            // pre update hooks
            if( this._preUpdateCbks.length > 0 ){
                for( let i = 0; i < this._preUpdateCbks.length; i++ ){
                    this._preUpdateCbks[i]( this );
                }
            }

            // update
            if (this._parent._dirty || this._dirty) {
                //this.transform = new TWO.core.math.Matrix3();
                this._transformMatrix.makeTranslate(this._position.x, this._position.y);
                if (this._rotation) {
                    this._transformMatrix.rotate(this._rotation);
                }
                this._transformMatrix.scale(this._scale.x, this._scale.y);

                //this.transform.multiply( this.pivot );

                if (this._parent !== undefined && this._parent._worldTransform !== undefined) {
                    this._worldTransform.copy(this._parent._worldTransform)
                        .multiply(this._transformMatrix);
                } else {
                    this._worldTransform.copy(this._transformMatrix);
                }

                this._calculateTransformedBRect();

                this._dirtyTransform = false;
                this._dirty = true;
            }
            let alpha = this._parent._worldAlpha * this._alpha;
            if (this._worldAlpha !== alpha) {
                this._worldAlpha = alpha;
                this._dirty = true;
            }

            // post update hooks
            if( this._postUpdateCbks.length > 0 ){
                for( let i = 0; i < this._postUpdateCbks.length; i++ ){
                    this._postUpdateCbks[i]( this );
                }
            }
            this._lastUpdateTime = time;
        }
    }

    _calculateTransformedBRect(){
        let a, b, c, d;
        let p0 = this.objectFactory.create("Vector");
        let p1 = this.objectFactory.create("Vector");
        let p2 = this.objectFactory.create("Vector");
        let p3 = this.objectFactory.create("Vector");
        // p0 - p1
        // |    |
        // p2 - p3

        p0.x = p2.x = this._pivot.x;
        p0.y = p1.y = this._pivot.y;
        p1.x = p3.x = this._w + this._pivot.x;
        p2.y = p3.y =  this._h + this._pivot.y;

        this._worldTransform.transformVector2(p0)
                            .transformVector2(p1)
                            .transformVector2(p2)
                            .transformVector2(p3);

        a = Math.min( p0.x, p1.x, p2.x, p3.x );
        a = a + (a < 0 ? -1 : 0) >> 0;
        b = Math.min( p0.y, p1.y, p2.y, p3.y );
        b = b + (b < 0 ? -1 : 0) >> 0;
        c = Math.max( p0.x, p1.x, p2.x, p3.x );
        c = c + (c < 0 ? 0 : 1) >> 0;
        d = Math.max( p0.y, p1.y, p2.y, p3.y );
        d = d + (d < 0 ? 0 : 1) >> 0;

        this._boundingRect.setPoints( a, b, c, d );
        this.objectFactory.dispose( p0 );
        this.objectFactory.dispose( p1 );
        this.objectFactory.dispose( p2 );
        this.objectFactory.dispose( p3 );
    }
}

export { SceneObject as SceneObject };
export { AnchorTypes as AnchorTypes };