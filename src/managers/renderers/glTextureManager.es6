/**
* Created by joseba on 19/2/16.
*/

"use strict";


let TextureManager = new ( class glTextureManager {
    constructor(){
        this.textures = new Map();
    }

    clearTextures (){
        this.textures.clear();
    }

    getTexture( name ){
        return this.textures.get( name );
    }

    createTexture( gl, id, source ){
        if( !this.textures[ id ] && !gl.isContextLost()){
            this.textures[id] = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.textures[id] );
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

            // check here for maximum size and resize if we are over it
            //var maxside = Math.max(source.width, source.height);
            //if(maxside > maxTextureSize)
            //{
            //    var ratio = maxTextureSize / maxside;
            //
            //    var canvasresize = document.createElement("canvas");
            //    var canvasresizectx = canvasresize.getContext("2d");
            //    canvasresize.width = source.width*ratio;
            //    canvasresize.height = source.height*ratio;
            //
            //    canvasresizectx.drawImage(source, 0, 0, canvasresize.width, canvasresize.height);
            //
            //    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvasresize);
            //} else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            //}
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            //gl.activeTexture(gl.TEXTURE0 );
            return this.textures[ id ];
        }
    }

    removeTexture( id ){
        this.textures.delete( id );
    }
})();

export { TextureManager as default };
