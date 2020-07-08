const path = require('path')
const fs = require('fs')
const metalsmith = require('metalsmith')
const { render } = require('consolidate').ejs
const { upperCaseTheFirstLetter } = require('../utils')

module.exports = (componentName) => {
  const templateSrc = path.resolve(
    __dirname,
    '../templates/react/component-template'
  )
  if (!fs.existsSync(path.resolve('components'))) {
    fs.mkdirSync(path.resolve('components'))
  }

  metalsmith(__dirname)
    .source(templateSrc)
    .destination(path.resolve('components', componentName))
    .use((files, metal, done) => {
      Object.keys(files).forEach(async (item) => {
        if (item.includes('js')) {
          let content = files[item].contents.toString()
          // content = content.replace(/componentName/g, componentName)
          // files[item].contents = Buffer.from(content)
          if (content.includes('<%')) {
            content = await render(content, {
              name: upperCaseTheFirstLetter(componentName)
            })
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
