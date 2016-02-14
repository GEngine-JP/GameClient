/**
 * 把今天最好的表现当作明天最新的起点．．～
 * いま 最高の表現 として 明日最新の始発．．～
 * Today the best performance  as tomorrow newest starter!
 * Created by IntelliJ IDEA.
 *
 * @author: xiaomo
 * @github: https://github.com/qq83387856
 * @email: hupengbest@163.com
 * @QQ_NO: 83387856
 * @Date: 2016/2/2 10:28
 * @Description: webpack配置文件
 * @Copyright(©) 2015 by xiaomo.
 **/
var webpack = require('webpack');
//noinspection JSUnresolvedFunction
module.exports = {
    entry: [
        //页面入口文件配置
        './app.ts',
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: 'src/assets/',
        publicPath: "/assets/",
        filename: 'bundle.js',
        css: 'style.css'
    },
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        //将样式统一发布到style.css中
        //new ExtractTextPlugin("style.css", {
        //    allChunks: true,
        //    disable: false
        //})
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                test: /\.jsx?$/,
                loaders: ['jsx?harmony']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel!jsx-loader?harmony'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            }
        ],
        noParse: /\.min\.js/
    }
};

