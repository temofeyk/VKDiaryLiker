let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: 'file-loader?name=images/[hash].[ext]'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader'
            })
        },
        {
            test: /\.(pug)$/,
            use: ['html-loader', 'pug-html-loader']
        },
        {
            test: /\.hbs/,
            loader: 'handlebars-loader'
        },
    ];
};