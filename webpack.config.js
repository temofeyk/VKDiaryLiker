let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let rules = require('./webpack.config.rules')();
let path = require('path');


module.exports = {

    entry: './src/index.js',
    output: {
        filename: '[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
  devtool: 'source-map',
    module: {
        rules: rules
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_debugger: false
            }
        }),
        new ExtractTextPlugin('[hash].css'),
        new HtmlPlugin({
            title: 'VK Liker',
            template: './index.pug',
            filename: 'index.html',
            chunks: ['main'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true
            }
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};