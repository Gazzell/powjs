module.exports = {
    entry: ['babel-polyfill', './src/pow.js'],
    output: {
        filename: 'pow.js',
        path: __dirname +'/bin',
        library: 'pow'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets:['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    externals: {
        'pow': 'pow'
    }
}
