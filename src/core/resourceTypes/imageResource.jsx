/**
 * Created by joseba on 7/3/16.
 */
"use strict";

var ImageResource = {
    type: 'image',
    parse: ( response ) => {
        return new Promise( (resolve, reject ) => {
            resolve( response.blob() );
        })
        .then( imgBlob => {
            var HTMLImage = new Image();
            HTMLImage.src = URL.createObjectURL( imgBlob );
            return HTMLImage ;
        })
        .catch( e => { throw e; });
    }
};

export { ImageResource as default };