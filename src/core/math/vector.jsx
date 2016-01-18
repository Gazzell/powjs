/**
 * Created by joseba on 18/1/16.
 */
"use strict";

class Vector{
    constructor( ){
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * Set
     * @param {number}  x
     * @param {number} y
     */
    set ( x, y ) {
        this.x = x;
        this.y = y;
    }

    /**
     * Reset to default
     */
    reset(){
        this.set( 0, 0 );
    }

    /**
     * Copy from another Vector2
     * @param {Object} v. TWO.core.math.Vector2 to copy
     */
    copy ( v ) {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     * Adds two vector2d
     * @param {Object} v1. TWO.core.math.Vector2 to add
     * @param {Object} v2. TWO.core.math.Vector2 to add
     */
    add ( v1, v2 ) {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
    }

    /**
     * Adds a Vector2 to thos vector
     * @param {Object} v. TWO.core.math.Vector2 to add
     */
    addSelf ( v ) {
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * substract two vector2d
     * @param {Object} v1. TWO.core.math.Vector2 to add
     * @param {Object} v2. TWO.core.math.Vector2 to add
     */
    sub ( v1, v2 ) {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
    }

    /**
     * Substract a Vector2 to this vector
     * @param {Object} v. TWO.core.math.Vector2 to add
     */
    subSelf ( v ) {
        this.x -= v.x;
        this.y -= v.y;
    }

    /**
     * Multiply by scalar
     * @param {number} s.Value to multiply
     */
    multiplyScalar ( s ) {
        this.x *= s;
        this.y *= s;
    }

    /**
     * divide by scalar
     * @param {number} s. Scalar to divide
     */
    divideScalar ( s ) {
        if ( s ) {
            this.x /= s;
            this.y /= s;
        } else {
            this.set( 0, 0 );
        }
    }


    /**
     * Negate
     */
    negate ( ) {
        this.multiplyScalar( -1 );
    }

    /**
     * Dot product
     * @param {Object} v. TWO.core.math.Vector2 to make the dot product
     * @returns {number}
     */
    dot ( v ) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Squared length
     * @returns {number}
     */
    lengthSq ( ) {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * length
     * @returns {number}
     */
    length ( ) {
        return Math.sqrt( this.lengthSq() );
    }

    /**
     * Normalize vector
     */
    normalize () {
        this.divideScalar( this.length() );
    }

    /**
     * Distance to a nother Vector2
     * @param {Object} v. TWO.core.math.Vector2
     * @returns {number} distance
     */
    distanceTo ( v ) {
        return Math.sqrt( this.distanceToSquared( v ) );
    }

    /**
     * Squared distance
     * @param {Object} v. TWO.core.math.Vector2
     * @returns {number} squared distance
     */
    distanceToSquared ( v ) {
        let dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    /**
     * Set vector's lenght
     * @param {number} l. Length to set
     */
    setLength ( l ) {
        this.normalize().multiplyScalar( l );
    }

    /**
     * Checks equality with another Vector2
     * @param {Object} v. TWO.core.math.Vector2 The vector2 to check against
     * @returns {boolean} true if equals
     */
    equals ( v ) {
        return ( ( v.x === this.x ) && ( v.y === this.y ) );
    }
}

export { Vector as default };