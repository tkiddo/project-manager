const handleExec = require('../lib/handleExec')
const path = require('path')
module.exports = (destDir) => {
  const message = 'linting code ...'
  const command = `yarn ${path.join(
    process.cwd(),
    'node_modules/.bin/eslint'
  )} ${destDir}/**/*.{js,jsx}`
  handleExec(command)(message)
}
