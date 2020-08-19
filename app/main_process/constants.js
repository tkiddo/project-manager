const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;
const version = '1.0.0';

const projectTemplateApi = {
  RepoUrl: 'https://api.github.com/repos/sliver-cli/project-template',
  downloadDir: '.sliver-cli/project-template'
};

const componentTemplateApi = {
  RepoUrl: 'https://api.github.com/repos/sliver-cli/component-template',
  downloadDir: '.sliver-cli/component-template'
};

module.exports = {
  downloadDirectory,
  version,
  projectTemplateApi,
  componentTemplateApi
};
