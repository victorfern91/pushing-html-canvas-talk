const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const glob_entries = require('webpack-glob-entries')

// importing webpack plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",

    devtool: "source-map",

    entry: glob_entries('./src/examples/**/*.js'),

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].js"
    },

    optimization: {
        splitChunks: {
            chunks: "async",
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "initial",
                    minChunks: 1,
                    minSize: 0
                },
                default: {
                    reuseExistingChunk: true
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },

    plugins: [
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ErrorOverlayPlugin(),
        new CopyWebpackPlugin([
            {
                from: "examples/**/*.html",
                to: "./"
            },
            {
                from: "examples/**/*.png",
                to: "./"
            },
            {
                from: "src/common/css/style.css",
                to: "./style.css"
            }
        ])
    ],

    resolve: {
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },

    devServer: {
        port: 8080,
        contentBase: "./dist",
        hot: true,
        overlay: true
    }
};
