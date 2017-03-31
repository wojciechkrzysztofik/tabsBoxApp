const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }],
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "less-loader", options: {
                        paths: [
                            path.resolve(__dirname, "src/assets/stylesheets")
                        ]
                    }
                }]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    node: {
        fs: "empty"
    }
};
