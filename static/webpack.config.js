const webpack = require("webpack"), path = require("path"), publicPath = '/static/dist';
module.exports = {
    mode: 'development',
    entry: {
        vendor: ['.src/js/vendor.js'],
        search: ['./src/js/search.js']
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve("./dist/js"),
        filename: '[name].js',

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: []
                }
            }
        ]
    }, plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ]
};