const { ipcMain } = require('electron');

module.exports = function componentProcess(params) {
  ipcMain.on('request-component-list', (event, arg) => {});
};
