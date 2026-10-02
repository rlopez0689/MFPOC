const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./paths");
const { getClientEnvironment } = require("./env");
const dependencies = require("../package.json").dependencies;

module.exports = (_env, argv = {}) => {
  const isProduction = (argv.mode || process.env.NODE_ENV) === "production";
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
  const styleLoaders = (useSass) => [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    { loader: "css-loader", options: { sourceMap: shouldUseSourceMap, importLoaders: useSass ? 2 : 1 } },
    { loader: "postcss-loader", options: { sourceMap: shouldUseSourceMap, postcssOptions: { plugins: [["autoprefixer", {}]] } } },
    ...(useSass ? [{ loader: "sass-loader", options: { sourceMap: shouldUseSourceMap } }] : [])
  ];

  return {
    mode: isProduction ? "production" : "development",
    bail: isProduction,
    context: paths.appDirectory,
    entry: paths.appIndex,
    output: {
      path: paths.appBuild,
      filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/[name].js",
      chunkFilename: isProduction ? "static/js/[name].[contenthash:8].chunk.js" : "static/js/[name].chunk.js",
      assetModuleFilename: "static/media/[name].[contenthash:8][ext]",
      publicPath: "auto",
      uniqueName: "userWidgetRemote",
      clean: false
    },
    devtool: shouldUseSourceMap ? (isProduction ? "source-map" : "eval-cheap-module-source-map") : false,
    cache: { type: "filesystem", buildDependencies: { config: [__filename] } },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      modules: ["node_modules", paths.appNodeModules]
    },
    module: {
      rules: [
        { test: /\.[jt]sx?$/, include: paths.appSrc, use: "babel-loader" },
        { test: /\.css$/i, use: styleLoaders(false) },
        { test: /\.s[ac]ss$/i, use: styleLoaders(true) },
        { test: /\.(png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$/i, type: "asset" }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: paths.appHtml, inject: "body", publicPath: "/" }),
      new webpack.DefinePlugin(getClientEnvironment().stringified),
      new ModuleFederationPlugin({
        name: "userWidget",
        filename: "remoteEntry.js",
        exposes: { "./UserWidget": "./src/federation/UserWidgetEntry.tsx" },
        shared: {
          react: { singleton: true, requiredVersion: dependencies.react },
          "react-dom": { singleton: true, requiredVersion: dependencies["react-dom"] },
          "@tanstack/react-query": { singleton: true, requiredVersion: dependencies["@tanstack/react-query"] },
          "styled-components": { singleton: true, requiredVersion: dependencies["styled-components"] }
        }
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({ filename: "static/css/[name].[contenthash:8].css", chunkFilename: "static/css/[name].[contenthash:8].chunk.css" })] : [])
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: isProduction ? { chunks: "all" } : false,
      // The federation container must initialize when a host loads only
      // remoteEntry.js; an extracted runtime chunk is not loaded by the host.
      runtimeChunk: false
    },
    performance: { hints: isProduction ? "warning" : false },
    devServer: {
      host: process.env.HOST || "localhost",
      port: Number(process.env.PORT) || 3000,
      historyApiFallback: true,
      hot: true,
      open: false,
      static: { directory: paths.appPublic, publicPath: "/", watch: true },
      client: { overlay: { errors: true, warnings: false } }
    },
    stats: "errors-warnings"
  };
};
