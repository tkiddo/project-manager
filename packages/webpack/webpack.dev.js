const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common.js')

module.exports = merge(baseConfig, {
  // 设置为开发模式
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  // 配置服务端目录和端口
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true
  }
})
