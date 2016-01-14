"use strict";
import { default as core } from "./core/core.jsx";
import { default as RenderManager } from "./core/renderManager.jsx";

class Engine {
    constructor( params ){
        this.htmlContainer = undefined;
        this.renderMgr = new RenderManager( );
        this.resourceMgr = new core.ResourceManager( );
        this.objectFactory = new core.ObjectFactory( );
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
}

export { Engine as default };
