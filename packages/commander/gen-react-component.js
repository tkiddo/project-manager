const path = require('path')
const fs = require('fs')
const metalsmith = require('metalsmith')
const render = require('../lib/render')
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
      render(files, { name: upperCaseTheFirstLetter(componentName) })
      done()
    })
    .build((err) => {
      if (err) {
        console.log(err)
      }
    })
}
