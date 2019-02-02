module.exports = {
    entry:'./src/store.js',
    output:{
        path: __dirname + '/dist',
        filename: 'store.js',
        library: 'Store',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    mode: 'production'
}