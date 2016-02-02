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
        './entry.js',
        // server
        'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: 'src/assets/',
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin("common.js"),
        new webpack.HotModuleReplacementPlugin(),
        //将样式统一发布到style.css中
        //new ExtractTextPlugin("style.css", {
        //    allChunks: true,
        //    disable: false
        //})
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel!jsx-loader?harmony',
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                // 使用 style-loader、css-loader 和 sass-loader 来编译处理
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                //.css 文件使用 style-loader 和 css-loader 来处理
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};

