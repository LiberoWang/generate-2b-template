const path = require('path');
const config = require('./config');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SSICompileWebpackplugin = require('ssi-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: config('development'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: '../dist',
    hot: true,
    watchContentBase: true,
    openPage: './pc.html',
    host: 't.gl.lenovouat.com'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'test title',
      minify:false,
      inject: true,
      filename: 'pc.html',
      template: './src/main/pc/pc.html',
      chunks: ["pc", "runtime", "vendors"]
    }),
    new HtmlWebpackPlugin({
      title: 'test title',
      filename: 'tablet.html',
      template: './src/main/tablet/tablet.html',
      chunks: ["tablet", "runtime", "vendors"],
      minify: false,
      inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'test title',
      filename: 'mobile.html',
      template: './src/main/mobile/mobile.html',
      chunks: ["mobile", "runtime", "vendors"],
      minify: false,
      inject: true
    }),
    new SSICompileWebpackplugin({
      remoteBasePath: "https://h1-ofp.lenovouat.com",
      minify: false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\/]node_modules[\/]/,
          minChunks: 1,
          priority: -10,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  watchOptions: {
    ignored: /node_modules/
  }
});
