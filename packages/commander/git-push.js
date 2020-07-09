const { exec } = require('child_process')
const inquirer = require('inquirer')

module.exports = async function () {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'message',
    message: 'message?'
  })
  console.log(answer)
  exec(
    `git pull && git add . && git commit -m ${answer.message} && git push origin master`
  )
}
