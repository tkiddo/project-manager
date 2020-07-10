const path = require('path')
const metalsmith = require('metalsmith')
const render = require('../lib/render')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

module.exports = async (projectName = 'demo') => {
  const templateList = fs.readdirSync(
    path.resolve(__dirname, '../templates/init')
  )
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: 'please choose a template',
    choices: templateList
  })
  const templateSrc = path.resolve(__dirname, '../templates/init', template)

  metalsmith(__dirname)
    .source(path.resolve(templateSrc, 'template'))
    .destination(path.resolve(projectName))
    .use(async (files, metal, done) => {
      const args = require(path.join(templateSrc, 'meta.js'))
      const res = await inquirer.prompt(args)
      const meta = metal.metadata()
      Object.assign(meta, res, { name: projectName })
      console.log(meta)
      delete files['meta.js']
      done()
    })
    .use((files, metal, done) => {
      render(files, metal.metadata())
      done()
    })
    .build((err) => {
      if (err) {
        console.log(chalk.red(err))
      }
    })
}
