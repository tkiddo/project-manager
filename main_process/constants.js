const downloadRootDir = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}`;
const version = '1.0.0';

const projectTemplateApi = {
  repoUrl: 'https://api.github.com/repos/sliver-cli/project-template',
  downloadDir: '.sliver-cli/project-template'
};

const componentTemplateApi = {
  react: {
    repoUrl: 'https://api.github.com/repos/sliver-cli/react-component',
    downloadDir: '.sliver-cli/react-component'
  }
};

module.exports = {
  downloadRootDir,
  version,
  projectTemplateApi,
  componentTemplateApi
};
