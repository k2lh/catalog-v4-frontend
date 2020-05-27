// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV || process.env.VUE_APP_ENV_NAME || 'production';
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const config = {
  entry: path.join(__dirname, 'src', 'main.js'),
  mode: env,
  output: {
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'index.html'),
      template: path.join(__dirname, 'static', 'index.html'),
      inject: true,
    }),
    new HtmlWebpackTagsPlugin({
      tags: [
        'https://domain.com/javascripts/api/tableau-2.min.js',
        'https://domain.com/javascripts/api/viz_v1.js'
      ],
      append: true
    })
  ],
};

module.exports = config;
