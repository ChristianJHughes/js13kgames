require('webpack');
const PATH = require('path');
const HTML_PLUGIN = require('html-webpack-plugin');
const MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin');
const HTML_INLINE_SOURCE_PLUGIN = require('html-webpack-inline-source-plugin');
const OPTIMIZE_CSS_ASSETS_PLUGIN = require('optimize-css-assets-webpack-plugin');
const IS_PRODUCTION = process.env.npm_lifecycle_event === 'build';

const APP_ENTRY = PATH.resolve('src', 'index.js');

let jsRule = {
  test: /\.js$/,
  use: ['babel-loader']
};

let cssRule = {
  test: /\.css$/,
  use: [
    MINI_CSS_EXTRACT_PLUGIN.loader,
    {
      loader: 'css-loader'
    }
  ]
};

const CONFIGURATION = {
  entry: APP_ENTRY,
  devtool: !IS_PRODUCTION && 'source-map',
  module: {
    rules: [jsRule, cssRule]
  },
  plugins: [
    new HTML_PLUGIN({
      template: 'src/index.html',
      minify: IS_PRODUCTION && {
        collapseWhitespace: true
      },
      inlineSource: IS_PRODUCTION && '.(js|css)$'
    }),
    new HTML_INLINE_SOURCE_PLUGIN(),
    new OPTIMIZE_CSS_ASSETS_PLUGIN({}),
    new MINI_CSS_EXTRACT_PLUGIN({
      filename: '[name].css'
    })
  ],
  devServer: {
    stats: 'minimal',
    overlay: true
  }
};

module.exports = CONFIGURATION;
