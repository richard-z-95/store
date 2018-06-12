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
    mode: 'production'
}