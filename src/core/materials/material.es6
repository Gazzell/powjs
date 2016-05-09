/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as FactoryObject } from "../factoryObject.es6";
import { basicShader as basicShader } from "./shaders/basicShader.es6";

let shaders = {
    basicShader: basicShader
};

class Material extends FactoryObject{
    constructor( objectFactory ){
        super( objectFactory );
        this._shaderProperties = {};
        this._shaderDef = undefined;
        this._shader = undefined;
    }

    init( params ){
        if( params && params.shader ){
            if( typeof param.shader === 'object' ){
                this._shaderDef = params.shader;
            } else if( shaders[ params.shader ] !== undefined ){
                this._shaderDef = shaders[ params.shader ];
            } else {
                this._shaderDef = basicShader;
            }
        }
        this._shader = this.objectFactory.create('GlShader', this._shaderDef );
    }

    reset(){
        if( this._shader !== undefined ) {
            this.objectFactroy.dispose(this._shader);
            this._shader = undefined;
        }
    }

    setProperty( propertyName, value ){
        if( this._shaderProperties[ propertyName ] !== undefined ){
            this._shaderProperties[ propertyName ] = value;
        }
    }

    use(){
        for( let key in this._shaderProperties ){
            this._shader.setUniformValue( )
        }
    }
}

export { Material as default };
