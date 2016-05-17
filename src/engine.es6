"use strict";
// import { default as core } from "./core/core.es6";
import { default as resourceManager } from "./managers/resourceManager.es6";
import { default as renderManager } from "./managers/renderManager.es6";
import { default as objectFactory } from "./managers/objectFactory.es6";
import { default as coreObjects } from "./coreObjects/coreObjects.es6";
import { default as scripts } from "./scripts/scripts.es6";

var _engine = new ( class Engine {
    constructor( params ){
        this.htmlContainer = undefined;
        this.resourceManager = resourceManager;
        this.objectFactory = objectFactory;
        this.renderManager = renderManager;

        // init managers
        this.objectFactory.registerObjects( coreObjects );
        if( scripts.loaders !== undefined ){
            this.resourceManager.registerResourceTypes( scripts.loaders );
        }
        this.renderManager.init( this.objectFactory );

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

    updateAndDraw( time, delta ){
        this.renderManager.updateAndDraw( time, delta );
    }
} )();

export { _engine as default };
export { coreObjects as coreObjects };
