/**
 * Created by joseba on 7/3/16.
 */
"use strict";

var ImageResource = {
    type: 'image',
    parse: ( response ) => {
        return new Promise( (resolve, reject ) =>{
            let pr = new Promise( (resolveParse, rejectParse ) => {
                resolveParse( response.blob() );
            })
            .then( imgBlob => {
                var HTMLImage = new Image();
                HTMLImage.src = URL.createObjectURL( imgBlob );
                HTMLImage.onload = function(){
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(this, 0, 0, this.width, this.height);
                    HTMLImage.src = '';
                    resolve( canvas );
                } ;
            })
            .catch( e => { throw e; });

        });
    }
};

export { ImageResource as default };