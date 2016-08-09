/**
 * Created by joseba on 19/2/16.
 */
"use strict";

let gl = undefined;
let maxSize = 256;
import { default as BasicMaterial } from '../../scripts/materials/basicMaterial.es6';
import { default as TextureManager } from './glTextureManager.es6';

let fillDrawList = function fillDrawList( node, drawList ){
    let size = node.children.length,
        index = 0;
    if( node.type !== 'SceneObject' ){
        drawList.push( node )
    }
    while(index < size){
        fillDrawList( node.children[index], drawList );
        index++;
    }
};

class SpriteBatchRendererClass {
    constructor( objectFactory, defaultViewport ) {
        this.objectfactory = objectFactory;
        this._renderTarget = undefined;
        this.shader = this.objectfactory.create("GlShader", {script: BasicMaterial} );
        if( !this.shader.use( defaultViewport._renderTarget ) ){
            console.warn('Failed to initialize basicMaterial shader');
        }

        gl = defaultViewport._renderTarget.glContext;

        var lostcall = function(event){
            event.preventDefault();
            //alert("Context Lost!");
            console.log("WebGL Context Lost!");
        };

        // called when the context is retored
        var onrestore = function(event){
            console.log("WebGL Context Restored!");
        };

        // listen to loss and restore events
        defaultViewport._renderTarget.canvas.removeEventListener('webglcontextlost', lostcall, false);
        defaultViewport._renderTarget.canvas.removeEventListener('webglcontextrestored', onrestore, false);

        defaultViewport._renderTarget.canvas.addEventListener('webglcontextlost', lostcall, false);
        defaultViewport._renderTarget.canvas.addEventListener('webglcontextrestored', onrestore, false);

        this.vertexSize = 5; // x, y, u, v, packed rgba

        // vertex buffer, stores maxsize of quads (4 vertex)
        this.vertexBuffer = undefined;
        this.indexBuffer = undefined;
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

        this._initGl();

    }

    _initGl(){
        // init buffers
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexes, gl.STATIC_DRAW);

        gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, this.vertexArray, gl.DYNAMIC_DRAW );



        this.shader.setAttributeAndUniformLocations();
        this._setAttribPoiters();


        // set rendering state
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }

    _setAttribPoiters(){
        var stride = this.vertexSize * 4;
        // TODO: mejorar esta gestión
        gl.vertexAttribPointer(this.shader.attribs.pos.attrib, 2, gl.FLOAT, false, stride, 0);
        gl.vertexAttribPointer(this.shader.attribs.aTextureCoord.attrib, 2, gl.FLOAT, false, stride, 2 * 4);

        // color attributes will be interpreted as unsigned bytes and normalized
        gl.vertexAttribPointer(this.shader.attribs.aColor.attrib, 4, gl.UNSIGNED_BYTE, true, stride, 4 * 4);
    }

    draw( time, delta, viewport ){
        let drawMatrix = this.objectfactory.create("Matrix3"),
            pivotMatrix = this.objectfactory.create("Matrix3"),
            preDrawMatrix = this.objectfactory.create("Matrix3");
        let drawList = [], elemNum = 0, total = 0, index = 0, currentTexture = undefined, currentAlpha = undefined, currentElement = undefined,
            a, b, c, d, tx, ty, u0, u1, v0, v1;
        let texture = undefined;

        if( viewport.scene !== undefined ) {
            this._renderTarget = viewport._renderTarget;

            preDrawMatrix.makeTranslate(0, this._renderTarget.height).scale(1, -1);

            gl = this._renderTarget.glContext;

            gl.viewport(0, 0, this._renderTarget.width, this._renderTarget.height);

            if(!gl.isContextLost()) {
                gl.clear(gl.COLOR_BUFFER_BIT);
            }

            fillDrawList(viewport.scene, drawList);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            this.shader.use( viewport.renderTarget );

            this._setAttribPoiters();

            this.shader.setUniformValue( 'resolution', [ this._renderTarget.width, this._renderTarget.height ]);

            for (let i = 0; i < drawList.length; i++) {
                currentElement = drawList[i];

                if (currentElement.surface !== undefined && currentElement.surface.width !== undefined) {
                    var invwidth = 1 / currentElement.surface.width;
                    var invheight = 1 / currentElement.surface.height;

                    var halfwidthpixel = 0.5 * invwidth;
                    var halfheightpixel = 0.5 * invheight;

                    pivotMatrix.makeTranslate(currentElement.pivot.x, currentElement.pivot.y);
                    drawMatrix.copy( preDrawMatrix ).multiply(currentElement._finalTransform).multiply(pivotMatrix);

                    a = drawMatrix.value[0];
                    b = drawMatrix.value[3];
                    c = drawMatrix.value[1];
                    d = drawMatrix.value[4];
                    tx = drawMatrix.value[2];
                    ty = drawMatrix.value[5];
                    if (currentElement.type == 'Sprite') {
                        u0 = currentElement._offset.x * invwidth;
                        v0 = currentElement._offset.y * invheight;
                        u1 = u0 + currentElement._w * invwidth;
                        v1 = v0 + currentElement._h * invheight;

                        u0 += halfwidthpixel;
                        v0 += halfheightpixel;

                        u1 -= halfwidthpixel;
                        v1 -= halfheightpixel;

                    } else {
                        u0 = v0 = 0.0;
                        u1 = v1 = 1.0;
                    }

                    currentElement._dirty = false;
                    currentElement._dirtyTransform = false;

                    // draw elements
                    var positions = this.positions;
                    var colors = this.colors;

                    // TODO: different tints
                    var tint = 0xFFFFFF;
                    var color = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + (1 /*currentElement.finalAlpha*/ * 255 << 24);


                    positions[index++] = tx;
                    positions[index++] = ty;
                    positions[index++] = u0;
                    positions[index++] = v0;
                    colors[index++] = color;

                    positions[index++] = c * currentElement._h + tx;
                    positions[index++] = d * currentElement._h + ty;
                    positions[index++] = u0;
                    positions[index++] = v1;
                    colors[index++] = color;

                    positions[index++] = a * currentElement._w + tx;
                    positions[index++] = b * currentElement._w + ty;
                    positions[index++] = u1;
                    positions[index++] = v0;
                    colors[index++] = color;

                    positions[index++] = a * currentElement._w + c * currentElement._h + tx;
                    positions[index++] = d * currentElement._h + b * currentElement._w + ty;
                    positions[index++] = u1;
                    positions[index++] = v1;
                    colors[index++] = color;

                    //var colIndex = elemNum * this.colorcomponents * 6;
                    //for( var p = 0; p < 6; p++ ){
                    //    this.colors[colIndex + p] = currentElement.finalAlpha;
                    //}

                    elemNum++;
                }
            }


            if (elemNum > maxSize * 0.5) {
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);
            } else {
                var view = this.positions.subarray(0, elemNum * this.vertexSize * 4);
                gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
            }

            elemNum = 0;
            index = 0;
            for (var i = 0; i < drawList.length; i++) {
                currentElement = drawList[i];

                if (currentElement.surface !== undefined && currentElement.surface.width !== undefined) {
                    if (currentElement._dirtyText === true) {
                        TextureManager.removeTexture(currentElement.surfaceId);
                        currentElement._dirtyText = false;
                    }
                    texture = TextureManager.getTexture(currentElement.surfaceId);
                    if (texture === undefined) {
                        if (currentTexture !== undefined) {
                            this.__flushBatch(currentTexture, elemNum, index);

                            index += elemNum;
                            elemNum = 0;
                        }
                        currentTexture = TextureManager.createTexture(gl, currentElement.surfaceId, currentElement.surface);
                    } else if (currentTexture !== texture || elemNum >= maxSize) {
                        this.__flushBatch(currentTexture, elemNum, index);

                        index += elemNum;
                        total += elemNum;
                        elemNum = 0;
                        if (currentTexture !== texture) {
                            currentTexture = texture;
                        }
                    }
                    //texture = currentElement._imageId;
                    elemNum++;

                }
            }

            this.__flushBatch(currentTexture, elemNum, index);
        }

        drawList.length = 0;
        currentTexture = undefined;

        this.objectfactory.reset( drawMatrix );
        this.objectfactory.reset( pivotMatrix );
    }

    __flushBatch ( texture, size, offsetIndex ) {
        if (size === 0) {
            return;
        }
        if (!gl.isContextLost()) {
            gl.bindTexture(gl.TEXTURE_2D, texture );
            gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, offsetIndex * 6 * 2);
        }
    }
}

export { SpriteBatchRendererClass as SpriteBatchRenderer };