const axios = require('axios')
const ora = require('ora')
const inquirer = require('inquirer')
const { promisify } = require('util')
const downloadGitRepo = promisify(require('download-git-repo'))
const ncp = promisify(require('ncp'))
const path = require('path')
const fs = require('fs')
const metalsmith = require('metalsmith')
let { render } = require('consolidate').ejs
render = promisify(render)
const { downloadDirectory } = require('./constants')

// https://api.github.com/orgs/sliver-cli/repos获取仓库列表
const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn(...args)
  spinner.succeed()
  return result
}

const fetchRepoList = async () => {
  const url = 'https://api.github.com/orgs/sliver-cli/repos'
  const { data } = await axios({
    url,
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
  return data
}

const downloadTemplate = async (repo) => {
  const dest = `${downloadDirectory}/.template/${repo}`
  await downloadGitRepo(`sliver-cli/${repo}`, dest)
  return dest
}

module.exports = async function (projectName) {
  let repos = await waitFnLoading(fetchRepoList, 'fetching templates...')()
  repos = repos.map((item) => item.name)
  const { template } = await inquirer.prompt({
    name: 'template',
    type: 'list',
    message: 'please choose a template',
    choices: repos
  })
  const result = await waitFnLoading(
    downloadTemplate,
    'loading template...'
  )(template)

  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    ncp(result, path.resolve(projectName))
  } else {
    await new Promise((resolve, reject) => {
      metalsmith(__dirname)
        .source(result)
        .destination(path.resolve(projectName))
        .use((files, metal, done) => {})
        .build((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
    })
  }
}
