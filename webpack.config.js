const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        "./src/js/index.js"
    ], //, "./src/scss/index.scss"
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    // plugins: [
    //     new ExtractTextPlugin('style.bundle.css'),
    // ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/],
                query: {
                    presets: ['latest', 'stage-0', 'react']
                }
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /public/],
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true
    },
};
