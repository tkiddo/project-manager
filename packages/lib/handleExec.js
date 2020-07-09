const { exec } = require('child_process')
const ora = require('ora')

module.exports = (shell, callback) => (message) => {
  const spinner = ora(message)
  spinner.start()
  exec(`${shell}`, (error, stdout, stderr) => {
    if (error) {
      return console.error(`exec error: ${error}`)
    }
    spinner.succeed()
    console.log('done.')
    typeof callback === 'function' && callback()
  })
}
