const { ipcMain, shell } = require('electron');
const fs = require('fs');
const { handleExec } = require('./utils');

module.exports = function commonProcess() {
  ipcMain.on('open-folder', (event, arg) => {
    if (fs.existsSync(arg)) {
      shell.showItemInFolder(arg);
    }
  });

  ipcMain.on('excute-command', (event, arg) => {
    handleExec(arg);
  });
};
