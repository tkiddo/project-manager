const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const metalsmith = require('metalsmith');
const {
  fetchGit,
  downloadRepo,
  renderTemplate,
  handleError,
  handleExec,
  wirteJson,
  isExisted,
  genID
} = require('./utils');
const { downloadRootDir, projectTemplateApi } = require('./constants');
const projectArray = require('./data/project.json');

module.exports = function templateProcess() {
  ipcMain.on('request-template-list', async (event, arg) => {
    const manifestSrc = path.join(
      downloadRootDir,
      `${projectTemplateApi.downloadDir}/manifest.json`
    );
    if (!arg && fs.existsSync(manifestSrc)) {
      // eslint-disable-next-line
      const result = require(manifestSrc);
      return event.reply('get-template-list', result);
    }
    const url = projectTemplateApi.repoUrl;
    let data;
    try {
      data = await fetchGit(url);
    } catch (error) {
      handleError(error);
    }
    // eslint-disable-next-line camelcase
    const { name, full_name } = data;
    const dest = await downloadRepo({ name, full_name });
    // eslint-disable-next-line
    const manifest = require(path.join(dest, 'manifest.json'));
    return event.reply('get-template-list', manifest);
  });

  ipcMain.on('create-template-project', async (event, arg) => {
    const { template, name, description, directory } = arg;
    const templateSrc = path.join(
      downloadRootDir,
      `${projectTemplateApi.downloadDir}/${template}/template`
    );
    await new Promise(() => {
      let destination = path.resolve(directory, name);
      destination = destination.replace(/\\/g, '/');
      if (isExisted(destination, projectArray)) {
        event.reply('error', '项目已存在！');
      } else {
        metalsmith(__dirname)
          .source(templateSrc)
          .destination(destination)
          .use((files, metal, done) => {
            const meta = { name, description };
            renderTemplate(files, meta);
            done();
          })
          .build((err) => {
            if (err) {
              handleError(err);
            } else {
              const shell = 'git init';
              handleExec({
                destination,
                shell
              });
              const id = genID();
              projectArray.unshift({ id, name, description, destination, template });
              wirteJson(path.resolve(__dirname, './data/project.json'), projectArray, () => {
                event.reply('project-created');
              });
            }
          });
      }
    });
  });
};
