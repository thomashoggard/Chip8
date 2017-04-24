var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html' },
            { from: './roms', to: 'roms'}
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
};

