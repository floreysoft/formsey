const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [                   
            {
                test: /\.ts?$/,
                use: ["babel-loader", 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(js)$/,
                use: ["babel-loader"],
                exclude: {
                    test   : path.resolve(__dirname, "node_modules/localforage"),
                    //exclude: path.resolve(__dirname, "node_modules/@polymer") // or your module - also can be an array (read doc)
                }
            }         
        ]
    },    
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })     
    ]
});