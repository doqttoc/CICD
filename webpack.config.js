const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const path = require("path")
const webpack = require("webpack")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".json",
      ".sass",
      ".scss",
      ".css",
    ],
    alias: {
      react: path.join(__dirname, "node_modules", "react"), // make sure resolve react on single copy, to avoid error caused by https://gist.github.com/jimfb/4faa6cbfb1ef476bd105
      "react-dom": path.join(__dirname, "node_modules", "react-dom"),
      mobx: path.join(__dirname, "node_modules", "mobx"),
      "mobx-react": path.join(__dirname, "node_modules", "mobx-react"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-react"] },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new CleanWebpackPlugin({ force: true }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json','python','java','shell','sql']
    })

  ],
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    open:  true,
    port: 7700,
    hot: true,
    proxy: {
      "/api": {
        target:process.env.REACT_APP_ENV == 'local' ?"http://localhost:8007"  : "http://124.220.72.195:8096",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}