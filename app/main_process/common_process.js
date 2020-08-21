const { ipcMain, shell } = require('electron');
const fs = require('fs');

module.exports = function commonProcess() {
  ipcMain.on('open-folder', (event, arg) => {
    console.log(arg);
    if (fs.existsSync(arg)) {
      shell.showItemInFolder(arg);
    }
  });
};
