/**
 * Created by joseba on 7/3/16.
 */
"use strict";

var ImageResource = {
    type: 'image',
    parse: ( response ) => {
        new Promise( resolve => resolve( response ) )
        .then( res => { return res.blob(); } )
        .then( imgBlob => {
            var HTMLImage = new Image();
            HTMLImage.src = URL.createObjectURL( imgBlob );
            return HTMLImage;
        })
    }
};

export { ImageResource as default };