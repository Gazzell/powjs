/**
 * Created by joseba on 2016/05/11.
 */
"use strict";
import { default as FactoryObject } from "./factoryObject.es6";

class Camera extends FactoryObject {
    constructor( objectFactory ){
        super( objectFactory );
        this._rect = this.objectFactory.create("Rect");
    }

    init( params ){
        if (params.rect !== undefined ){
            this.setRect( rect.x, rect.y, rect.w, rect.h );
        }
    }

    setRect( x, y, w, h ){
        this._rect.set( x, y, w, h );
    }
    set rect( rect ){
        this._rect.copy( rect );
    }
    get rect(){
        return this._rect;
    }
};

export { Camera as default };
