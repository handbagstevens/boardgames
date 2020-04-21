"use strict";

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const isWebpackDevServer = process.argv.some(a => path.basename(a) === 'webpack-dev-server');

module.exports = {
    devtool: "eval",

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        port: 4008,
        stats: 'errors-only',
    },

    // watchOptions: {
    //     ignored: ["./src/**", "node_modules/**"]
    // },

    mode: "development",

    entry: "./src/index.js",

    output: {
        // clean-webpack-plugin removes files in the dev path
        path: path.resolve(__dirname, "dev"),
        filename: "app.js",
        chunkFilename: "[name].bundle.js",
        pathinfo: false
    },

    resolve: {
        modules: [ "node_modules" ],
        extensions: [".purs", ".js"]
    },

    module: {
        rules: [
            { test: /\.css$/i
            , use: ["style-loader", "css-loader"]
            },
            { test: /\.purs$/
            , use: [
                {
                    loader: 'purs-loader',
                    options: {
                        src: [
                            'src/**/*.purs'
                        ],
                        spago: true,
                        watch: isWebpackDevServer || isWatch,
                        pscIde: true
                    }
                }
            ]
            },
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Board Games",
            template: "public/index.html",
            inject: false
        }),
        function(){
            this.plugin("done", function(stats){
                process.stderr.write(stats.toString("errors-only"));
            });
        }
    ]
};

// 'use strict';

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const isWebpackDevServer = process.argv.some(a => path.basename(a) === 'webpack-dev-server');
// const isWatch = process.argv.some(a => a === '--watch');

// const plugins =
//   isWebpackDevServer || !isWatch ? [] : [
//     function(){
//       this.plugin('done', function(stats){
//         process.stderr.write(stats.toString('errors-only'));
//       });
//     }
//   ]
// ;

// module.exports = {
//   devtool: 'eval-source-map',

//   devServer: {
//     contentBase: path.resolve(__dirname, 'public'),
//     port: 4008,
//     stats: 'errors-only'
//   },

//   entry: './src/index.js',

//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   },

//   module: {
//     rules: [
//       {
//         test: /\.purs$/,
//         use: [
//           {
//             loader: 'purs-loader',
//             options: {
//               src: [
//                 'src/**/*.purs'
//               ],
//               spago: true,
//               watch: isWebpackDevServer || isWatch,
//               pscIde: true
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(png|jpg|gif)$/i,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 8192,
//             },
//           },
//         ],
//       },
//     ]
//   },

//   resolve: {
//     modules: [ 'node_modules' ],
//     extensions: [ '.purs', '.js']
//   },

//   plugins: [
//     new webpack.LoaderOptionsPlugin({
//       debug: true
//     }),
//     new HtmlWebpackPlugin({
//       title: 'purescript-webpack-example',
//       template: 'public/index.html'
//     })
//   ].concat(plugins)
// };
