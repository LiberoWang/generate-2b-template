const path = require('path');
const config = require('./config');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HttlTransWebpackPlugin = require('httl-trans-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = require('./pages');

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
    port: 9989,
    openPage: './pc.html',
    host: 't.gl.lenovouat.com'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    // new SSICompileWebpackplugin({
    //   remoteBasePath: "https://h1-ofp.lenovouat.com",
    //   minify: false
    // })
  ].concat(
    pages.map(({ name, chunks }) => new HtmlWebpackPlugin({
      filename:`${name}.html`,
      template: `./httl/${name}.httl`,
      chunks: ['runtime', 'vendors'].concat(chunks),
      minify: false,
      inject: true
    }))
  ).concat(
    new HttlTransWebpackPlugin({
      langCode: 'en',
      ext: '.html',
      renderEndpoint: 'http://10.122.80.61:8080/httl/httl/render',
      minify: false,
      scripts: [
        '//j1-ofp.lenovouat.com/t_/en_us/version/js/f68db661c07129fd097117918fd6b7f2.js',
        '//j1-ofp.lenovouat.com/SystemFragment/adobe/checkout.adobe.4066905172a83b46.js'
      ]
    })
  ),
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
