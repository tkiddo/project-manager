const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const projectArray = require('./data/project.json');

const { handleExec, wirteJson, isExisted, handleError } = require('./utils');

module.exports = function projectProcess() {
  ipcMain.on('get-project-list', (event) => {
    event.returnValue = projectArray;
  });
  ipcMain.on('open-project', (event, arg) => {
    const { ide, destination } = arg;
    switch (ide) {
      case 'vscode':
        // eslint-disable-next-line no-case-declarations
        const shell = `Code ${destination}`;
        handleExec({ destination, shell });
        break;

      default:
        break;
    }
  });
  ipcMain.on('import-project', (event, arg) => {
    const { directory } = arg;
    if (isExisted(directory)) {
      return handleError('项目已存在！');
    }
    if (fs.existsSync(path.join(directory, 'package.json'))) {
      const pkg = require(path.join(directory, 'package.json'));
      projectArray.unshift({
        name: pkg.name,
        description: pkg.description,
        destination: directory,
        template: 'none'
      });
      wirteJson(path.resolve(__dirname, './data/project.json'), projectArray, () => {
        event.returnValue = projectArray;
      });
    }
  });
  ipcMain.on('delete-project', (event, arg) => {
    projectArray.splice(arg, 1);
    wirteJson(path.resolve(__dirname, './data/project.json'), projectArray, () => {
      event.returnValue = projectArray;
    });
  });
};
