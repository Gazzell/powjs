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
        this._lastUpdateTime = -1;
        this._hooks = {};
    }

    init( params ){
        if( params && params.script ){
            if( typeof param.script === 'object' ){
                this.script = params.script;
            }
        }
    }

    dispose(){
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

    use( viewport ){
        for( let key in this._shaderProperties ){
            switch ( key ){
                case 'resolution':
                    this.setProperty( viewport.innerSize );
                    break;
            }
            this._shader.setUniformValue( key, this._shaderProperties[ key ] );
        }
    }

    set script( script ){
        if( script !== this._script && this._shader !== undefined ){
            this.objectFactory.dispose( this._shader );
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
