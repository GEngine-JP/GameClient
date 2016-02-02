'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nib = require('nib');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const webpack = require('webpack');


module.exports = {
    entry: {
        'js/index.min.js': './docs/src/index.js',
        'css/index.css': './docs/style/index.styl'
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            include: /(src|docs\/src)/,
            query: {
                cacheDirectory: '.babelcache'
            },
            test: /\.js$/
        }, {
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
            include: /docs\/style/,
            test: /\.styl$/
        }]
    },
    output: {
        filename: 'docs/static/[name]'
    },
    plugins: [
        new UglifyJsPlugin({
            include: /\.min.js$/,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('docs/static/[name]')
    ],
    stylus: {
        use: [nib()]
    }
};
