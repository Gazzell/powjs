/**
 * Created by joseba on 18/1/16.
 */
"use strict";
import { default as FactoryObject } from "../factoryObject.jsx";

const ARR_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

class Matrix3 extends FactoryObject {
    constructor( objectFactory ){
        super( objectFactory );
        this.value = new ARR_TYPE( 6 );
        this.value = [1, 0, 0, 0, 1, 0];
    }

    /**
     * Sets the matrix assining all the values
     * @param m00
     * @param m10
     * @param m20
     * @param m01
     * @param m11
     * @param m21
     */
    set (m00, m10, m20, m01, m11, m21){
        let val = this.value;
        val[0] = m00;
        val[1] = m10;
        val[2] = m20;
        val[3] = m01;
        val[4] = m11;
        val[5] = m21;
        return this;
    }

    /**
     * Reset to default
     */
    reset(){
        this.identity();
        return this;
    }

    /**
     * Copy to this matrix the values of another one
     * @param {Matrix3} m. Reference matrix
     */
    copy (m){
        let val = this.value,
            valM = m.value;
        let i = 5;
        do {
            val[i] = valM[i];
        } while( i-- )
        return this;
    }

    /**
     * Copy to this matrix the values of another one
     */
    clone ( ){
        var newMat = this.objectFactory.create( "Matrix3" );
        newMat.copy( this );
        return newMat;
    }

    /**
     * Reset this matrix
     */
    identity ( ){
        let val = this.value;

        val[0] = 1;
        val[1] = 0;
        val[2] = 0;
        val[3] = 0;
        val[4] = 1;
        val[5] = 0;
        return this;
    }

    /**
     * Set this matrix aas a rotation matrix
     * @param {number} angle. Angle in Radians
     */
    makeRotate ( angle ){
        let val = this.value;

        let v0 = Math.sin(angle);
        let v1 = Math.cos(angle);
        val[0] = v1;
        val[1] = -v0;
        val[2] = 0;
        val[3] = v0;
        val[4] = v1;
        val[5] = 0;
        return this;
    }

    /**
     * Apply a rotation to this matrix
     * @param {number} angle. Angle to rotate in radians
     */
    rotate (angle){
        let t0, t1, t3, t4;
        let val = this.value;

        let v0 = Math.sin(angle);
        let v1 = Math.cos(angle);
        t0 = val[0]*v1 + val[1]*v0;
        t1 = val[0]*(-v0) + val[1]*v1;
        t3 = val[3]*v1 + val[4]*v0;
        t4 = val[3]*(-v0) + val[4]*v1;
        val[0] = t0;
        val[1] = t1;
        val[3] = t3;
        val[4] = t4;
        return this;
    }

    /**
     * Set matrix as a scale matrix
     * @param {number} sx. Scale in x
     * @param {number} sy. Scale in y
         */
    makeScale ( sx, sy ){
        let val = this.value;

        val[0] = sx;
        val[1] = 0;
        val[2] = 0;
        val[3] = 0;
        val[4] = sy;
        val[5] = 0;
        return this;
    }

    /**
     * Set matrix as a scale matrix
     * @param {Vector} v. Scale
     */
    makeScaleFromVector ( v ){
        this.makeScale( v.x, v.y );
        return this;
    }

    /**
     * Apply a scale to this matrix
     * @param {number} sx. Scale in x
     * @param {number} sy. Scale in y
         */
    scale (sx, sy){
        let val = this.value;

        val[0] *= sx;
        val[1] *= sy;
        val[3] *= sx;
        val[4] *= sy;
        return this;
    }

    /**
     * Apply a scale to this matrix
     * @param {Vector} v. Scale
     */
    scaleFromVector ( v ){
        this.scale( v.x, v.y );
        return this;
    }

    /**
     * Set matrix as a translation matrix
     * @param {number} x. Translation in x
     * @param {number} y. Translation in y
     */
    makeTranslate (x, y){
        let val = this.value;

        val[0] = 1;
        val[1] = 0;
        val[2] = x;
        val[3] = 0;
        val[4] = 1;
        return this;
    }

    /**
     * Set matrix as a translation matrix
     * @param {Vector} v. Translation vector
     */
    makeTranslateFromVector ( v ){
        this.makeTranslate( v.x, v.y );
        return this;
    }

    /**
     * Apply a translation to this matrix matrix
     * @param {number} x. Translation in x
     * @param {number} y. Translation in y
     */
    translate ( x, y ){
        this.value[2] += x;
        this.value[5] += y;
        return this;
    }

    /**
     * Apply a translation to this matrix matrix
     * @param {Vector} v. Translation vector
     */
    translateFromVector ( v ){
        this.translate( v.x, v.y );
        return this;
    }

    /**
     * Premultiply matrix ( this = this * matrix)
     * @param {Object} matrix. TWO. core.math.Matrix to premultiply
     */
    multiply ( matrix ){
        let val = this.value,
            matVal = matrix.value;
        let a0 = val[0], a1 = val[1], a2 = val[2], a3 = val[3], a4 = val[4], a5 = val[5];

        val[0] = a0 * matVal[0] + a1 * matVal[3];
        val[1] = a0 * matVal[1] + a1 * matVal[4];
        val[2] = a0 * matVal[2] + a1 * matVal[5] + a2;
        val[3] = a3 * matVal[0] + a4 * matVal[3];
        val[4] = a3 * matVal[1] + a4 * matVal[4];
        val[5] = a3 * matVal[2] + a4 * matVal[5] + a5;
        return this;
    }

    /**
     * Transforms a vector 2 by this matrix ([v[0], v[1], 1] * this)
     * @param {Object} v. TWO.core.math.Vector2 to transform
     */
    transformVector2(v){
        let v0, v1;
        let val = this.value;

        v0 = v.x*val[0] + v.y*val[1] + val[2];
        v1 = v.x*val[3] + v.y*val[4] + val[5];
        v.x = v0;
        v.y = v1;
        return this;
    }

    /**
     * Gets inverse matrix
     * @param {Object} result. TWO.core.math.Matrix to set
     * @returns {number} -1 if failed, undefined otherwise
     */
    getInverse( result ){
        let m00 = this.value[0];
        let m01 = this.value[1];
        let m02 = this.value[2];
        let m10 = this.value[3];
        let m11 = this.value[4];
        let m12 = this.value[5];


        let determinant = m00 * m11 - m10 * m01;
        if (determinant === 0) {
            return -1;
        }

        let m = result.value;

        m[0] = m11;
        m[1] = -m01;
        m[2] = m01 * m12 - m02 * m11;

        m[3] = -m10;
        m[4] = m00;
        m[5] = m02 * m10 - m00 * m12;

        result.multiplyScalar(1 / determinant);
    }

    /**
     * Multiply by a scalar
     * @param {number} scalar. Scalar to multiply
     * @returns {Matrix3} this matrix
     */
    multiplyScalar(scalar) {
        let val = this.value;

        let i = 5;

        do {
            val[i] *= scalar;
        } while( i-- );

        return this;
    }

    /**
     * Check if this matrix is equal to a given one
     * @param {Object} mat. TWO.core.math.Matrix to compare
     * @returns {boolean} true if equal, false otherwise
     */
    equals( mat ){
        let matVal = mat.value;
        let val = this.value;


        return val[0] == matVal[0] &&
            val[1] == matVal[1] &&
            val[2] == matVal[2] &&
            val[3] == matVal[3] &&
            val[4] == matVal[4] &&
            val[5] == matVal[5];
    }
}

export { Matrix3 as default };