const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config')

module.exports = () => {
  webpack({ ...webpackConfig }, (err, stats) => {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        return
      }

      const info = stats.toJson()

      if (stats.hasErrors()) {
        console.error(info.errors)
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }
    }
    // 处理完成
  })
}
