"use strict";
import { default as core } from "./core/core.jsx";

class Engine {
    constructor( params ){
        this.htmlContainer = undefined;
        this.renderMgr = core.renderManager;
        this.resourceMgr = core.resourceManager;
        this.objectFactory = core.objectFactory;
        this.objectFactory.registerObjects( core.math );
        this.objectFactory.registerObjects( core.renderables );

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
