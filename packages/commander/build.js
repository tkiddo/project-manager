const webpack = require('webpack')
let config = require('../webpack/webpack.prod')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = () => {
  const configFile = fs.existsSync(
    path.resolve(process.cwd(), 'webpack.config.js')
  )
    ? path.resolve(process.cwd(), 'webpack.config.js')
    : null
  console.log(chalk.blueBright('Creating an optimized production build...'))
  if (configFile) {
    config = merge(config, require(configFile))
  }
  webpack(config, (err, stats) => {
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

    // 记录结果...
  })
}
