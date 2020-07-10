const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common.js')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const homepage = require('./package.json').homepage

module.exports = merge(baseConfig, {
  // 设置为生产模式
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: homepage || '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // tree shaking
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // 针对生产环境对libraries进行优化
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
