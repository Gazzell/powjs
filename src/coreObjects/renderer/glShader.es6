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
        this._script = undefined;
    }

    init( params ){
        if( params.script ){
            this.script = params.script;
        }
    }

    dispose() {
        this.attribs = {};
        this.uniforms = {};
        this._script = undefined;
        this.program = undefined;
        this.vertexShader = undefined;
        this.fragmentShader = undefined;
        this.gl = undefined;
    }

    set script( script ){
        if( this._script !== undefined ){
            this.attribs = {};
            this.uniforms = {};
        }
        this._script = script;
        if( this._script !== undefined ){
            if( this._script.attributes !== undefined ){
                this._script.attributes.forEach( att => this.addAttribute( att ) );
            }

            if( this._script.uniforms !== undefined ){
               this._script.uniforms.forEach( uniform => this.addUniform( uniform.name, uniform.type ) );
            }

            this.setAttributeAndUniformLocations();
        }
    }

    compile(){
        let ok = false,
            gl = this.gl;
        if( gl && this._script ) {
            this.program = gl.createProgram();
            this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this.vertexShader, this._script.vs);
            gl.compileShader(this.vertexShader);
            ok = gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS);

            if (ok) {
                this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(this.fragmentShader, this._script.fs);
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

    addAttribute( name, attributeType ){
        this.attribs[ name ] = {
            aType: attributeType,
            attrib: undefined
        }
    }

    addUniform( name, uniformType ){
        this.uniforms[ name ] = {
            uType: uniformType,
            uniform: undefined
        }
    }

    setUniformValue( name, value ){
        if( this.uniforms[ name ] !== undefined ){
            if( Array.isArray( value ) ){
                let length = value.length;
                if( length === 1 ){
                    this.gl[ this.uniforms[ name ].uType ]( value[0] );
                } else if( length === 2 ){
                    this.gl[ this.uniforms[ name ].uType ]( value[0], value[1] );
                } else if( length === 3 ) {
                    this.gl[ this.uniforms[ name ].uType ]( value[0], value[1], value[2] );
                } else if( length === 4 ) {
                    this.gl[ this.uniforms[ name ].uType ]( value[0], value[1], value[2], value[3] );
                }
            } else {
                this.gl[ this.uniforms[name].uType ]( value );
            }
        }
    }

    setAttributeAndUniformLocations(){
        let gl = this.gl;
        if( this.program !== undefined ) {
            for( let attribName in this.attribs ){
                this.attribs[ attribName ].attrib =  gl.getAttribLocation(this.program, attribName );
                gl.enableVertexAttribArray( this.attribs[ attribName ].attrib );
            }

            for( let uniformName in this.uniforms ){
                this.uniforms[ uniformName ].uniform =  gl.getUniformLocation(this.program, uniformName );
            }
        }
    }
}

export { GlShader as default };
