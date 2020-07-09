const path = require('path')
const CLIEngine = require('eslint').CLIEngine
const chalk = require('chalk')
const { waitFnPending } = require('../utils/index')
module.exports = (...destDir) => {
  const config = require(path.join(process.cwd(), '.eslintrc.json'))
  const cli = new CLIEngine(config)
  const fn = (destDir) => {
    const { results } = cli.executeOnFiles(destDir)
    results.forEach((item) => {
      if (item.messages.length > 0) {
        console.log(chalk.yellowBright(`\nfilePath: ${item.filePath}`))
        item.messages.forEach((item) => {
          const { line, column, message } = item
          console.log(chalk.redBright(`[${line},${column}]:${message}`))
        })
      }
    })
    return results
  }
  waitFnPending(fn, chalk.blueBright('linting ... '))(destDir)
}
