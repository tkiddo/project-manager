const { exec } = require('child_process')
const inquirer = require('inquirer')
const ora = require('ora')

module.exports = async function () {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'message',
    message: 'message?'
  })
  const spinner = ora('publishing...')
  spinner.start()
  exec(
    `git pull && git add . && git commit -m ${answer.message} && git push origin master`,
    (error, stdout, stderr) => {
      if (error) {
        return console.error(`exec error: ${error}`)
      }
      spinner.succeed()
      console.log('done.')
    }
  )
}
