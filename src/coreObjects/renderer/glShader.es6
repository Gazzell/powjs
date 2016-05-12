/**
 * Created by joseba on 19/2/16.
 */

"use strict";
import {default as FactoryObject} from "../factoryObject.es6";

class GlShader extends FactoryObject{
    constructor( factoryObject ){
        super( factoryObject );
        this.gl = undefined;
        this.vertexShader = undefined;
        this.fragmentShader = undefined;
        this.program = undefined;
        this.attribs = {};
        this.uniforms = {};
        this.script = undefined;
    }

    init( materialDef ){
        if( materialDef ){
            this.materialDef = materialDef;
        }
    }

    compile(){
        let ok = false,
            gl = this.gl;
        if( gl && this.materialDef ) {
            this.program = gl.createProgram();
            this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this.vertexShader, this.script.vertexShader);
            gl.compileShader(this.vertexShader);
            ok = gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS);

            if (ok) {
                this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(this.fragmentShader, this.script.fragmentShader);
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

    use( canvas ){
        if( this.gl === undefined || this.program === undefined ){
            this.gl = canvas.getContext("experimental-webgl");
            if( this.gl !== undefined ){
                return this.compile();
            }
        } else {
            return true;
        }
        return false;
    }

    addAttribute( name, type ){
        this.attribs[ name ] = type;
    }

    addUniform( name, type ){
        this.uniforms[ name ] = type;
    }

    setAttributeAndUniformLocations(){

    }
}

export { GlShader as default };
