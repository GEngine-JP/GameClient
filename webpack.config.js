/**
 * Created by Administrator on 2016/2/20.
 */
var webpack = require('webpack');
module.exports = {
    entry: [
        //页面入口文件配置
        './src/main.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        path: 'build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }, {
                test: /\.woff$/,
                loader: 'url?limit=100000'
            }]
    },
    plugins: [
        //提公用js到common.js文件中
        //new webpack.optimize.CommonsChunkPlugin("common.js"),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    }
};
//module.exports = config;