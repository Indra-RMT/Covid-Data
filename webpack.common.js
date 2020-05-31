const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/images/icon.png')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './src/images'),
        to: path.resolve(__dirname, './dist/images')
      }],
    }),
  ]

}