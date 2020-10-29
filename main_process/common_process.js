const { ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { handleExec, wirteJson } = require('./utils');
const errorArray = require('./data/error.json');

module.exports = function commonProcess() {
  ipcMain.on('open-folder', (event, arg) => {
    if (fs.existsSync(arg)) {
      shell.showItemInFolder(arg);
    }
  });

  ipcMain.on('excute-command', (event, arg) => {
    handleExec(arg);
  });

  ipcMain.on('log-error', (event, arg) => {
    errorArray.unshift(arg);
    wirteJson(path.join(__dirname, 'data/error.json'), errorArray);
  });
};
