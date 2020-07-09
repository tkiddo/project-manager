const path = require('path')
const metalsmith = require('metalsmith')
const render = require('../lib/render')
const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = (projectName) => {
  const templateSrc = path.resolve(__dirname, '../templates/init')

  metalsmith(__dirname)
    .source(templateSrc)
    .destination(path.resolve(projectName))
    .use(async (files, metal, done) => {
      const args = require(path.join(templateSrc, 'meta.js'))
      const res = await inquirer.prompt(args)
      if (res.eslint) {
        const { rule } = await inquirer.prompt({
          type: 'list',
          name: 'rule',
          message: 'choose a rule',
          choices: ['standard', 'airbnb']
        })
        res.rule = rule
      } else {
        res.rule = null
      }
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
