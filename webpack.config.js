var webpack = require('webpack');
module.exports = {
    entry: ['babel-polyfill', './src/pow.es6'],
    output: {
        filename: 'pow.js',
        path: __dirname +'/bin',
        library: 'pow'
    },
    module: {
        loaders: [
            {
                test: /\.es6?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets:['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    resolve: {
        extensions: ["", ".js", ".es6"]
    },
    externals: {
        'pow': 'pow'
    }
}
