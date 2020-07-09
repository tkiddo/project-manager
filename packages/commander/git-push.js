const { exec } = require('child_process')
const inquirer = require('inquirer')
const { waitFnLoading } = require('../utils/index')

module.exports = async function () {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'message',
    message: 'message?'
  })
  const exeFn = () =>
    exec(
      `git pull && git add . && git commit -m ${answer.message} && git push origin master`
    )
  await waitFnLoading(exeFn, 'publish...')()
}
