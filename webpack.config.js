const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
function join(val) {
  return path.join(__dirname, val);
}
module.exports = {
  target: "node",
  mode: "production",
  devtool: "inline-source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "./tsconfig.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    index: join("./src/index.ts"),
  },
  output: {
    path: join("./lib"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "react-auth-router",
    umdNamedDefine: true,
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
