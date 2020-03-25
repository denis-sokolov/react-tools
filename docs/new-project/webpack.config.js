"use strict";

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
if (!isDevelopment && !isProduction) throw new Error("Unexpected NODE_ENV");

module.exports = async function () {
  return {
    devtool: isDevelopment ? "eval" : "hidden-source-map",
    entry: {
      main: ["react-hot-loader/patch", "./src/index.tsx"],
    },
    mode: isDevelopment ? "development" : "production",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: ["react-hot-loader/babel"],
              },
            },
            {
              loader: "ts-loader",
              options: {
                compilerOptions: { module: "es2015" },
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]-[hash].[ext]",
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]-[hash].[ext]",
            },
          },
        },
      ],
    },
    output: {
      filename: "[name].[hash].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      // new CopyWebpackPlugin(["./src/favicon.ico"])
    ],
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
      extensions: [".ts", ".tsx", ".js"],
      plugins: [
        new TsconfigPathsPlugin({ extensions: [".ts", ".tsx", ".js"] }),
      ],
    },
  };
};
