/**
 * Created by joseba on 14/1/16.
 */

"use strict";
import { default as FactoryObject } from "../factoryObject.es6";

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
        this._anchorType = AnchorTypes["TOP_LEFT"];
        this._anchor = objectFactory.create("Vector");
        this._customAnchor = false;
        this._parent = undefined;

        this.children = [];

        this._transformMatrix = objectFactory.create("Matrix3");
        this._finalTransform = objectFactory.create("Matrix3");
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
        return this;
    }

    reset(){
        this._position.reset();
        this._rotation = 0;
        this._scale.set( 1, 1 );
        this._alpha = 1.0;
        this._pivot.reset();
        this._anchorType = AnchorTypes["TOP_LEFT"];
        this._anchor.reset();

        this._transformMatrix.reset();
        this._boundingRect.reset();

        this.children.forEach( child => this.objectFactory.reset( child ) );
        this.children.length = 0;

        this._parent = undefined;
        this._dirty = true;
        this._dirtyTransform = true;

        this._preDrawCbks.length = 0;
        this._postDrawCbks.length = 0;
        return this;
    }

    /**
     * Set element property
     * @param {string} property name
     * @param value
     * @returns {SceneObject} this
     */
    set( transformName, value ){
        if( this.hasOwnProperty( transformName ) ){
            this[ transformName ] = value;
        }
        return this;
    }

    /**
     * Apply transform
     * @param {string} transformName
     * @param value
     * @returns {SceneObject} this
     */
    transform( transformName, value ){
        if( transformName === 'translate' ){
            this.position.addSelf( value );
        } else if( transformName === 'rotate' ){
            this.rotation += value;
        } else if( transformName === 'scale' ){
            this.scale.addSelf( value );
        }
        this._dirty = true;
        this._dirtyTransform = true;
        return this;
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

    get pivot(){
        return this._pivot;
    }

    get anchor(){
        return this._anchorType;
    }

    set anchor( anchorType ){
        let aType = AnchorTypes[ anchorType ];
            if(  aType !== undefined && aType !== this._anchorType ) {
                if (this.type == 'Object2d' && aType != AnchorTypes['CUSTOM']) {
                    this._anchorType = AnchorTypes.CENTER;
                } else {
                    this._anchorType = aType;
                }

                if(aType == AnchorTypes["TOP_LEFT"]) {
                    this._anchor.set(0, 0);
                } else if( aType == AnchorTypes["TOP_CENTER"]) {
                    this._anchor.set(0.5, 0);
                } else if( aType == AnchorTypes["TOP_RIGHT"]) {
                    this._anchor.set(1, 0);
                } else if( aType == AnchorTypes["CENTER_LEFT"]) {
                    this._anchor.set(0, 0.5);
                } else if( aType == AnchorTypes["CENTER"]) {
                    this._anchor.set(0.5, 0.5);
                } else if( aType == AnchorTypes["CENTER_RIGHT"]) {
                    this._anchor.set(1, 0.5);
                } else if( aType == AnchorTypes["BOTTOM_LEFT"]) {
                    this._anchor.set(0, 1);
                } else if( aType == AnchorTypes["BOTTOM_CENTER"]) {
                    this._anchor.set(0.5, 1);
                } else if( aType == AnchorTypes["BOTTOM_RIGHT"]) {
                    this._anchor.set(1, 1);
                } else if( aType == AnchorTypes["CUSTOM"]){
                    this._customAnchor = true;
                }
            }

            if (this._anchorType !== AnchorTypes["CUSTOM"]) {
                this._pivot.set( -this._anchor.x * this._w,  -this._anchor.y * this._h );
                this._dirtyTransform = true;
            }
    }

    get anchor(){
        return this._anchor;
    }

    addChild( child, index = -1 ){
        if( index !== -1 && index < this.children.length - 1){
            this.children.splice( index, 0, child );
        } else {
            child._parent = this;
            this.children.push( child );
        }
        return this;
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
            if ((this._parent !== undefined && this._parent._dirty) || this._dirty) {
                //this.transform = new TWO.core.math.Matrix3();
                this._transformMatrix.makeTranslate(this._position.x, this._position.y);
                if (this._rotation) {
                    this._transformMatrix.rotate(this._rotation);
                }
                this._transformMatrix.scale(this._scale.x, this._scale.y);

                //this.transform.multiply( this.pivot );

                if (this._parent !== undefined && this._parent._finalTransform !== undefined) {
                    this._finalTransform.copy(this._parent._finalTransform)
                        .multiply(this._transformMatrix);
                } else {
                    this._finalTransform.copy(this._transformMatrix);
                }

                this._calculateTransformedBRect();

                this._dirtyTransform = false;
                this._dirty = true;
            }
            let alpha = this._parent === undefined ? this._alpha : this._parent._worldAlpha * this._alpha;
            if (this._worldAlpha !== alpha) {
                this._worldAlpha = alpha;
                this._dirty = true;
            }

            for( let i = 0; i < this.children.length; i++ ){
                this.children[i].update( time, delta );
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

        this._finalTransform.transformVector2(p0)
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
        this.objectFactory.reset( p0 );
        this.objectFactory.reset( p1 );
        this.objectFactory.reset( p2 );
        this.objectFactory.reset( p3 );
    }
}

export { SceneObject as SceneObject };
export { AnchorTypes as AnchorTypes };