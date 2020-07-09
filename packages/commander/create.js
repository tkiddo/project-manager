const axios = require('axios')
const inquirer = require('inquirer')
const { promisify } = require('util')
const downloadGitRepo = promisify(require('download-git-repo'))
const ncp = promisify(require('ncp'))
const path = require('path')
const fs = require('fs')
const metalsmith = require('metalsmith')
const render = require('../lib/render')
const { downloadDirectory } = require('../lib/constants')
const chalk = require('chalk')

const { waitFnLoading } = require('../utils/index')

const fetchRepoList = async () => {
  const url = 'https://api.github.com/orgs/sliver-cli/repos'
  const { data } = await axios({
    url,
    headers: {
      Accept: 'application/vnd.github.v3+json,application/json'
    }
  })
  return data
}

const downloadTemplate = async (repo) => {
  const dest = `${downloadDirectory}/.sliver-template/${repo}`
  await downloadGitRepo(`sliver-cli/${repo}`, dest)
  return dest
}

module.exports = async function (projectName) {
  let repos = await waitFnLoading(
    fetchRepoList,
    chalk.blueBright('fetching templates...')
  )()
  repos = repos.map((item) => item.name)
  const { template } = await inquirer.prompt({
    name: 'template',
    type: 'list',
    message: 'please choose a template',
    choices: repos
  })
  const result = await waitFnLoading(
    downloadTemplate,
    chalk.blueBright('loading template...')
  )(template)

  const templateSrc = `${result}/template`
  if (!fs.existsSync(path.join(result, 'meta.js'))) {
    ncp(templateSrc, path.resolve(projectName))
  } else {
    await new Promise((resolve, reject) => {
      metalsmith(__dirname)
        .source(templateSrc)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(result, 'meta.js'))
          const res = await inquirer.prompt(args)
          const meta = metal.metadata()
          Object.assign(meta, res, { name: projectName })
          // delete files['meta.js']
          done()
        })
        .use((files, metal, done) => {
          const meta = metal.metadata()
          render(files, meta)
          done()
        })
        .build((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
    })
    console.log(chalk.green('Success ! you can start by: '))
    console.log(`\ncd ${projectName}`)
    console.log('\nnpm install')
    console.log('\nnpm start')
  }
}
