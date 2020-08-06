const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { fetchGit, downloadRepo } = require('./utils');
const { downloadDirectory } = require('./constants');

module.exports = function local() {
  ipcMain.on('request-template-list', async (event, arg) => {
    const manifestSrc = path.join(downloadDirectory, '.sliver-cli/cli-template/manifest.json');
    if (!arg && fs.existsSync(manifestSrc)) {
      // eslint-disable-next-line
      const result = require(manifestSrc);
      return event.reply('get-template-list', result);
    }
    const url = 'https://api.github.com/repos/sliver-cli/cli-template';
    let data;
    try {
      data = await fetchGit(url);
    } catch (error) {
      dialog.showErrorBox('boom!', JSON.stringify(error));
    }
    // eslint-disable-next-line camelcase
    const { name, full_name } = data;
    const dest = await downloadRepo({ name, full_name });
    // eslint-disable-next-line
    const manifest = require(path.join(dest, 'manifest.json'));
    return event.reply('get-template-list', manifest);
    // event.returnValue = await fetchTemplateList();
  });
};
