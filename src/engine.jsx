"use strict";
import { default as core } from "./core/core.jsx";

class Engine {
    constructor( params ){
        this._viewports = [];
        this.htmlContainer = undefined;
        this.resourceMgr = core.resourceManager;
        this.objectFactory = core.objectFactory;
        this.objectFactory.registerObjects( core.math );
        this.objectFactory.registerObjects( core.renderables );
        this.objectFactory.registerObjects( core.renderer );
        this.objectFactory.registerObjects( core.materials );

        if(!params){
            params = {};
        }

        if( !params.container ){
            this.htmlContainer = document.createElement('div');
            this.htmlContainer.name = 'POW_Div';
            this.htmlContainer.id   = 'POW_Div';
            this.htmlContainer.setAttribute("style", "position:absolute;top:0px;left:0px;");
            params.container = this.htmlContainer;
        } else {
            this.htmlContainer = params.container;
        }
    }

    addViewport( viewport ){
        if( this._viewports.indexOf( viewport ) === -1 ){
            this._viewports.push( viewport );
        }
    }
    removeViewport( viewport ){
        let index = this._viewports.indexOf( viewport );
        if( index !== -1 ){
            this._viewports.slice( index, 1 );
        }
    }

    updateAndDraw( time, delta ){
        let i = 0;
        while( i < this._viewports.length ){
            this._viewports[i].updateAndDraw( time, delta );
        }
    }
}

export { Engine as default };
