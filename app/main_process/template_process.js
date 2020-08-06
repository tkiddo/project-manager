const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { fetchGit, downloadRepo } = require('./utils');
const { downloadDirectory } = require('./constants');

module.exports = function local() {
  ipcMain.on('request-template-list', async (event, arg) => {
    const manifestSrc = path.join(downloadDirectory, '.sliver-cli/cli-template/manifest.json');
    if (fs.existsSync(manifestSrc)) {
      // eslint-disable-next-line
      const result = require(manifestSrc);
      return event.reply('get-template-list', result);
    }
    const url = 'https://api.github.com/repos/sliver-cli/cli-template';
    const data = await fetchGit(url);
    // eslint-disable-next-line camelcase
    const { name, full_name } = data;
    const dest = await downloadRepo({ name, full_name });
    const manifest = fs.readFileSync(path.join(dest, 'manifest.json'));
    event.reply('get-template-list', manifest);
    // event.returnValue = await fetchTemplateList();
  });
};
