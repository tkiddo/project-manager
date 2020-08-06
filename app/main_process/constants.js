const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;
const version = '1.0.0';

module.exports = {
  downloadDirectory,
  version
};
