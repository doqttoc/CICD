const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const path = require("path")

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
    new CleanWebpackPlugin({ force: true }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    port: 6699,
    hot: true,
    proxy: {
      "/api": {
        target: "http://baidu.com",
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}