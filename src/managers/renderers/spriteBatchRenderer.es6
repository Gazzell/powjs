/**
 * Created by joseba on 19/2/16.
 */
"use strict";

let gl = undefined;
let maxSize = 256;
import { default as BasicMaterial } from '../../scripts/materials/basicMaterial.es6';

class SpriteBatchRendererClass {
    constructor( objectFactory, defaultViewport ) {
        this.objectfactory = objectFactory;
        this.renderTarget = undefined;
        this.shader = this.objectfactory.create("GlShader", BasicMaterial );
        gl = defaultViewport.renderTarget.getContext("experimental-webgl");

        this.vertexSize = 5; // x, y, u, v, packed rgba

        // vertex buffer, stores maxsize of quads (4 vertex)
        this.vertexBuffer = undefined;
        this.vertexArray  = new ArrayBuffer( maxSize * 4 * 4 * this.vertexSize );

        // subview, storing positions and texture coords.
        this.positions  = new Float32Array( this.vertexArray );

        // subview storing color as packed rgba
        this.colors = new Uint32Array( this.vertexArray );


        // index buffer, storing 6 indexes per quad (to draw 2 triangles)
        this.indexes = new Uint16Array( maxSize * 6 );
        // fill the indexes with the quads to draw
        for (var i=0, j=0; i <  maxSize * 6; i += 6, j += 4)
        {
            this.indexes[i + 0] = j + 0;
            this.indexes[i + 1] = j + 1;
            this.indexes[i + 2] = j + 2;
            this.indexes[i + 3] = j + 1;
            this.indexes[i + 4] = j + 3;
            this.indexes[i + 5] = j + 2;
        }

        //
        this._drawList = [];
    }

    draw( time, delta, viewport ){
        this.renderTarget = viewport.renderTarget;
        if( gl === undefined ){
            gl = this.renderTarget.glContext;
        }
    }
}

export { SpriteBatchRendererClass as SpriteBatchRenderer };