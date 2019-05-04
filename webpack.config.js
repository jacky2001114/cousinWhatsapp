"use strict";

const Path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
//const WebpackPWAManifest = require("webpack-pwa-manifest");

module.exports = (env, argv) => {
    const isProduction = (argv.mode === "production");

    const config = {
        entry: {
            "main":  Path.resolve(__dirname, "src/index.tsx"),
            //"theme": Path.resolve(__dirname, "src/theme/theme.scss"),
        },
        output: {
            chunkFilename: "[name].[id].js",
            filename:      "[name].js",
            path:          Path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [{
                test:    /.tsx?$/,
                exclude: /node_modules/,
                loader:  "ts-loader"
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  //  MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }, {
                test: /\.(eot|svg|ttf|woff(2)?)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name:       "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            }]
        },
        resolve: {
            extensions: [ ".ts", ".tsx", ".js" ],
            alias: {
                "react":     "preact-compat",
                "react-dom": "preact-compat"
            }
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: "src/index.html", to: "index.html" },
                //{ from: "res/social", to: "social" }
            ]),
            new HTMLWebpackPlugin({
                template:      "./src/index.html",
                excludeChunks: ["theme"],
                inject:        true,
                title:         "cousin Whatsapp"
            })
           
        ],
        watch: false,
        devtool: "",
        devServer: {
            contentBase: Path.resolve(__dirname, "src"),
            host: "0.0.0.0",
            inline: true,
            port: 8080
        }
    }

    if (!isProduction) {
        config.module.rules.push({ 
            enforce: "pre", 
            test:    /\.js$/, 
            loader:  "source-map-loader" 
        });

        config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }));

        config.devtool = "source-map";
    } else if (isProduction) {
        config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }));
    }

    return config;
};
