const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  // console.log("env::::::", argv);
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/app.js",
    mode: "development",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
      publicPath: "/dist/"
    },
    // loader
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css"
      })
    ],
    devtool: isProduction ? "source-map" : "inline-cheap-module-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "public")
      },
      port: 9000,
      historyApiFallback: true
    }
  };
};
