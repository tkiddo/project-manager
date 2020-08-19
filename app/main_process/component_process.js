const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { fetchGit, downloadRepo, handleError } = require('./utils');
const { downloadRootDir, reactComponentApi } = require('./constants');

module.exports = function componentProcess() {
  ipcMain.on('request-react-component-list', async (event, arg) => {
    const manifestSrc = path.join(
      downloadRootDir,
      `${reactComponentApi.downloadDir}/manifest.json`
    );
    if (!arg && fs.existsSync(manifestSrc)) {
      // eslint-disable-next-line
      const result = require(manifestSrc);
      return event.reply('get-react-component-list', result);
    }
    const url = reactComponentApi.repoUrl;
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
    return event.reply('get-react-component-list', manifest);
  });
};
