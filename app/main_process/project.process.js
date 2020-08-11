const { ipcMain } = require('electron');
const projectArray = require('./data/project.json');

module.exports = function projectProcess() {
  ipcMain.on('get-project-list', (event) => {
    event.returnValue = projectArray;
  });
};
