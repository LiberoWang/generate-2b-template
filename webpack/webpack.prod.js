const path = require('path');
const config = require('./config');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const moduleLists = [];

config('production').forEach(component => {
  component.list.forEach(item => {
    const itemCommom = merge(common, {
      mode: 'production',
      entry: item.entry,
      output: {
        path: path.resolve(__dirname, `../dist/${item.terminal}`),
        filename: `${item.terminal}.js`,
        library: component.library,
        libraryTarget: "umd",
        libraryExport: 'default',
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: `${item.terminal}.css`, chunkFilename: '[name].css' }),
        new CopyWebpackPlugin({ patterns: [{ from:path.join(__dirname,`../httl/${item.terminal}.httl`), to:'' }] }),
      ]
    });

    moduleLists.push(itemCommom);
  })
});


module.exports = moduleLists;
