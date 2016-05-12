/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as FactoryObject } from "../factoryObject.es6";

class Material extends FactoryObject{
    constructor( objectFactory ){
        super( objectFactory );
        this._shaderProperties = {};
        this._script = undefined;
        this._shader = undefined;
    }

    init( params ){
        if( params && params.script ){
            if( typeof param.script === 'object' ){
                this.script = params.script;
            }
        }
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

    use(time, viewport, camera ){
        for( let key in this._shaderProperties ){
            this._shader.setUniformValue( )
        }
    }

    set script( script ){
        if( script !== this._script) {
            if( this._shader !== undefined ){
                this.objectFactory.dispose( this._shader );
            }

        }
        this._script = script;
        if( this._script !== undefined ){
          this._shader = this.objectFactory.create('GlShader', this._script );
        }
    }

    get script(){
        return this._script;
    }
}

export { Material as default };
