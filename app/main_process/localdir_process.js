const { ipcMain, dialog } = require('electron');

module.exports = function local() {
  ipcMain.on('get-local-dir', (event, arg) => {
    event.returnValue = process.cwd();
  });

  ipcMain.on('change-dir', (event, arg) => {
    dialog
      .showOpenDialog({ properties: [arg] })
      .then((res) => {
        if (res.filePaths) {
          const path = res.filePaths[0];
          event.reply('selected-dir', path);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
