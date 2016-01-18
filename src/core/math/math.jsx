/**
 * Created by joseba on 18/1/16.
 */

"use strict";
import { default as Vector } from "./vector.jsx";
import { default as Rect } from "./rect.jsx";
import { default as Matrix3 } from "./matrix3.jsx";

var math = {
    Vector: Vector,
    Rect: Rect,
    Matrix3: Matrix3
};
export { math as default };