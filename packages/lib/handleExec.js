const { exec } = require('child_process')
const ora = require('ora')
const chalk = require('chalk')
module.exports = (shell, callback) => (message) => {
  const spinner = ora(chalk.blueBright(message))
  spinner.start()
  exec(`${shell}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${chalk.red(error)}`)
      process.exit(0)
      return
    }
    spinner.succeed()
    console.log(chalk.green('done.'))
    typeof callback === 'function' && callback()
  })
}
