const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/build/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
