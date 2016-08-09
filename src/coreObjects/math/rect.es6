/**
 * Created by joseba on 18/1/16.
 */
"use strict";
import { default as FactoryObject } from "../factoryObject.es6";
import { default as Vector } from "./vector.es6";

class Rect extends FactoryObject{
    constructor( objectFactory ) {
        super( objectFactory );
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        return this;
    }

    /**
     * Sets Rect values
     * @param {number} x. x position
     * @param {number} y. y position
     * @param {number} w. width
     * @param {number} h. height
     */
    set(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        return this;
    }

    /**
     * reset to default
     */
    reset(){
        this.set( 0, 0, 0, 0 );
        return this;
    }

    /**
     * Set Rect as initial and final point
     * @param {number} pix. Initial x
     * @param {number} piy. Initial y
     * @param {number} pfx. Final x
     * @param {number} pfy. Final y
     */
    setPoints(pix, piy, pfx, pfy) {
        this.x = pix;
        this.y = piy;
        this.w = pfx - pix;
        this.h = pfy - piy;
        return this;
    }

    /**
     * Copy a rect into this one
     * @param {Object} rect. TWO.core.math.Rect to copy
     */
    copy(rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.w = rect.w;
        this.h = rect.h;
        return this;
    }

    /**
     * Check if this rect intersects with a given one
     * @param {Object} rect. TWO.core.math.Rect to check intersection against
     * @returns {boolean} true if intersect
     */
    intersects(rect) {
        return !(this.x > rect.x + rect.w || this.x + this.w < rect.x
        || this.y > rect.y + rect.h || this.y + this.h < rect.y);
    }

    /**
     * Calculates the closes point to a Vector 2
     * @param {Object} p. TWO.core.math.Vector2 to test
     * @param {Object} result. TWO.core.math.Vector2 result
     */
    closestPointToVector2(p, result) {
        result.copy(p);
        if (result.x < this.x) {
            result.x = this.x;
        }// v = max(v, b.min[i])
        if (result.x > this.x + this.w) {
            result.x = this.x + this.w;
        }// v = min(v, b.max[i])
        if (result.y < this.y) {
            result.y = this.y;
        }// v = max(v, b.min[i])
        if (result.y > this.y + this.h) {
            result.y = this.y + this.h;
        }// v = min(v, b.max[i])
        return this;
    }

    /**
     * Check if a given point is inside the Rect
     * @param {number} x. X coord
     * @param {number} y. Y coord
     * @returns {boolean} tru if its inside
     */
    isPointInside(x, y) {
        return (x >= this.x && x <= this.x + this.w &&
        y >= this.y && y <= this.y + this.h );
    }

    /**
     * Translate rect using a Vector2
     * @param  {Object} vector. TWO.core.math.Vector2 to translate
     */
    translate(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Sets this Rect as the union of this rect with a given one
     * @param {Object} rect. Rect to make union with
     */
    union(rect) {
        let tempVect = this.objectFactory.create("Vector");
        tempVect.set(Math.min(this.x, rect.x), Math.min(this.y, rect.y));
        this.w = Math.max(this.x + this.w, rect.x + rect.w) - tempVect.x;
        this.h = Math.max(this.y + this.h, rect.y + rect.h) - tempVect.y;
        this.x = tempVect.x;
        this.y = tempVect.y;
        this.objectFactory.release( tempVect );
        return this;
    }
}

export { Rect as default };

