/**
 * Created by joseba on 19/4/16.
 */

var BasicMaterial = {
    vs: "precision lowp float;" +
        "attribute vec2 pos;" +
        "uniform vec2 resolution;" +
        "attribute vec2 aTextureCoord;" +
        "attribute vec4 aColor;" +
        "varying vec2 vTextureCoord;" +
        "varying vec4 vColor;" +
        "void main() {" +
        "   vec2 fpos = (pos / resolution) * 2.0 - 1.0;" +
        "   gl_Position = vec4(fpos, 0.0, 1.0);" +
        "   vTextureCoord = aTextureCoord;" +
        "   vColor = aColor;" +
        "}",
    fs: "precision lowp float;" +
        "varying vec2 vTextureCoord;" +
        "varying vec4 vColor;" +
        "uniform sampler2D uSampler;" +
        "void main() {" +
        "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor.a;" +
        "}",
    attributes:[
        "pos", "aTextureCoord", "aColor"
    ],
    uniforms: [
        {
            name: 'uSampler',
            type: 'sampler2D'
        },
        {
            name: 'resolution',
            type: 'uniform2f'
        }
    ],
    uniformHooks:{
        'resolution': ['viewport.rect.w', 'viewport.rect.h']
    }
};

export { BasicMaterial as default };
