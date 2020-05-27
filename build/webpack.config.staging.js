'use strict'
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.staging.cssSourceMap })
  },
  externals: {
    fs: 'fs'
  },
  // cheap-module-eval-source-map is faster for development
  mode: "production", // to optimize js files size
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: '"staging"',
        ROOT_API: '"/api"',
        BASE_URL: '"https://site-staging.domain.net/"'
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
