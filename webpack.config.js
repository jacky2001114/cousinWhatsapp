"use strict";

const Path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
//const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
//const WebpackPWAManifest = require("webpack-pwa-manifest");

module.exports = (env, argv) => {
    const isProduction = (argv.mode === "production");

    const config = {
        entry: {
            "main":  Path.resolve(__dirname, "src/App.tsx"),
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
                    MiniCssExtractPlugin.loader,
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
            /* new HTMLWebpackPlugin({
                template:      "!!handlebars-loader!src/index.hbs",
                excludeChunks: ["theme"],
                inject:        false,
                title:         "What's my Minecraft UUID?"
            }), */
            /* new MiniCssExtractPlugin({
                chunkFilename: "[id].css",
                filename:      "[name].css",
            }), */
            /* new WebpackPWAManifest({
                filename:         "manifest.json",
                fingerprints:     false,
                inject:           false,
                name:             "What's my Minecraft UUID?",
                short_name:       "Minecraft UUID",
                description:      "Check the UUID of your Minecraft username with a click of a button!",
                display:          "standalone",
                theme_color:      "#16222A",
                background_color: "#16222A",
                orientation:      "any",
            }) */
        ],
        watch: false,
        devtool: "",
        devServer: {
            contentBase: Path.resolve(__dirname, "dist"),
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
