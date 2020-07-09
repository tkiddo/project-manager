const path = require('path')
const generateTemplate = require('../lib/generateTemplate')
const { upperCaseTheFirstLetter } = require('../utils')

module.exports = (componentName) => {
  const templateSrc = path.resolve(
    __dirname,
    '../templates/react/component-template'
  )
  const destDir = 'components'
  generateTemplate(upperCaseTheFirstLetter(componentName))(templateSrc, destDir)
}
