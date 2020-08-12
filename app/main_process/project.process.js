const { ipcMain } = require('electron');
const projectArray = require('./data/project.json');
const { handleExec } = require('./utils');

module.exports = function projectProcess() {
  ipcMain.on('get-project-list', (event) => {
    event.returnValue = projectArray;
  });
  ipcMain.on('open-project', (event, arg) => {
    const { ide, destination, name } = arg;
    switch (ide) {
      case 'vscode':
        // eslint-disable-next-line no-case-declarations
        const shell = `cd .. && Code ${name}`;
        handleExec({ destination, shell });
        break;

      default:
        break;
    }
  });
};
