const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;
const version = '1.0.0';

const templateApi = {
  RepoUrl: 'https://api.github.com/repos/sliver-cli/cli-template',
  downloadDir: '.sliver-cli/cli-template'
};

module.exports = {
  downloadDirectory,
  version,
  templateApi
};
