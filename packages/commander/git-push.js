const inquirer = require('inquirer')
const handleExec = require('../lib/handleExec')
const lint = require('../commander/lint')

module.exports = async function () {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'message',
    message: 'message?'
  })
  await lint()
  const command = `git pull && git add . && git commit -m "${answer.message}" && git push origin master`
  const message = 'publishing...'
  handleExec(command)(message)
}
