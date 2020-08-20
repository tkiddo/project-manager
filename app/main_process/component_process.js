const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const metalsmith = require('metalsmith');
const { fetchGit, downloadRepo, handleError } = require('./utils');
const { downloadRootDir, componentTemplateApi } = require('./constants');

module.exports = function componentProcess() {
  ipcMain.on('request-component-list', async (event, arg) => {
    const { type, forced } = arg;
    const manifestSrc = path.join(
      downloadRootDir,
      `${componentTemplateApi[type].downloadDir}/manifest.json`
    );
    if (!forced && fs.existsSync(manifestSrc)) {
      // eslint-disable-next-line
      const result = require(manifestSrc);
      return event.reply('get-component-list', result);
    }
    const url = componentTemplateApi[type].repoUrl;
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
    return event.reply('get-component-list', manifest);
  });

  ipcMain.on('create-component', async (event, arg) => {
    const { name, filepath, type, directory } = arg;
    const templateSrc = path.join(
      downloadRootDir,
      `${componentTemplateApi[type].downloadDir}/${filepath}`
    );
    await new Promise(() => {
      let destination = path.resolve(directory, name);
      destination = destination.replace(/\\/g, '/');
      if (fs.existsSync(destination)) {
        event.reply('error', '组件已存在！');
      } else {
        metalsmith(__dirname)
          .source(templateSrc)
          .destination(destination)
          .build((err) => {
            if (err) {
              handleError(err);
            } else {
              event.reply('component-created');
            }
          });
      }
    });
  });
};
