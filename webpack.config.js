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
module.exports = {
    entry: [
        './entry.js'
    ],
    output: {
        path: 'src/assets/',
        publicPath: "/assets/",
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("common.js")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['jsx?harmony']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'react-hot!jsx-loader?harmony'
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(css)$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};
