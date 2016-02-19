/**
 * Created by joseba on 19/2/16.
 */

"use strict";
import {default as FactoryObject} from "../factoryObject.jsx";

class GlShader extends FactoryObject{
    constructor( factoryObject, params ){
        super( factoryObject );
        this.gl = params.renderer? params.renderer.glContext : undefined;
        this.vertexShader = undefined;
        this.fragmentShader = undefined;
        this.program = undefined;
    }

    compile(){
        let ok = false,
            gl = this.gl;
        if( gl ) {
            this.program = gl.createProgram();
            this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this.vertexShader, simpleVertexShader);
            gl.compileShader(this.vertexShader);
            ok = gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS);

            if (ok) {
                this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(this.fragmentShader, simpleFragmentShader);
                gl.compileShader(this.fragmentShader);
                ok = gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS);

                if (ok) {
                    gl.attachShader(this.program, this.vertexShader);
                    gl.attachShader(this.program, this.fragmentShader);
                    // link the program.
                    gl.linkProgram(this.program);

                    // Check if it linked.
                    ok = gl.getProgramParameter(this.program, gl.LINK_STATUS);

                    if (ok) {
                        gl.useProgram(this.program);

                    } else {
                        console.log(gl.getProgramInfoLog(this.program));
                        gl.deleteProgram(this.program);
                    }
                } else {
                    console.log(gl.getShaderInfoLog(this.fragmentShader));
                    gl.deleteShader(this.fragmentShader);
                }
            } else {
                console.log(gl.getShaderInfoLog(this.vertexShader));
                gl.deleteShader(this.vertexShader);
            }
        }

        return ok;
    }
}

export { GlShader as default };