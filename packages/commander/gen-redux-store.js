const path = require('path')
const fs = require('fs')
const metalsmith = require('metalsmith')
const render = require('../lib/render')

module.exports = (storeName) => {
  const templateSrc = path.resolve(
    __dirname,
    '../templates/react/store-template'
  )
  if (!fs.existsSync(path.resolve('store'))) {
    fs.mkdirSync(path.resolve('store'))
  }

  metalsmith(__dirname)
    .source(templateSrc)
    .destination(path.resolve('store', storeName))
    .use((files, metal, done) => {
      render(files, { name: storeName })
      done()
    })
    .build((err) => {
      if (err) {
        console.log(err)
      }
    })
}
