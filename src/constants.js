const { version } = require('../package.json')
const downloadDirectory = `${
  process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']
}`

module.exports = {
  version,
  downloadDirectory
}
