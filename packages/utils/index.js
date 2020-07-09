const ora = require('ora')
const chalk = require('chalk')

const upperCaseTheFirstLetter = (string) =>
  string.substring(0, 1).toUpperCase() + string.substring(1)

const handleAwait = (promise) => {
  return promise
    .then((data) => [data])
    .catch((err) => {
      console.log(err)
      return [null, err]
    })
}

const waitFnPending = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn(...args)
  spinner.succeed(chalk.greenBright('done.'))
  return result
}

module.exports = {
  upperCaseTheFirstLetter,
  handleAwait,
  waitFnPending
}