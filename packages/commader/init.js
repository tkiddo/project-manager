const path = require('path')
const metalsmith = require('metalsmith')
const { render } = require('consolidate').ejs
const inquirer = require('inquirer')

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
          choices: ['standard', 'eslint']
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
      Object.keys(files).forEach(async (item) => {
        if (
          item.includes('js') ||
          item.includes('json') ||
          item.includes('json')
        ) {
          let content = files[item].contents.toString()
          if (content.includes('<%')) {
            content = await render(content, metal.metadata())
            files[item].contents = Buffer.from(content)
          }
        }
      })
      done()
    })
    .build((err) => {
      if (err) {
        console.log(err)
      }
    })
}
