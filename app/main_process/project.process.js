const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const projectArray = require('./data/project.json');

const { handleExec, wirteJson, isExisted, genID } = require('./utils');

module.exports = function projectProcess() {
  ipcMain.on('get-project-list', (event) => {
    event.returnValue = projectArray;
  });

  ipcMain.on('open-project', (event, arg) => {
    const { ide, destination } = arg;
    switch (ide) {
      case 'vscode':
        // eslint-disable-next-line no-case-declarations
        if (fs.existsSync(destination)) {
          const shell = `Code ${destination}`;
          handleExec({ destination, shell });
        } else {
          event.reply('error', '项目不存在！');
        }

        break;

      default:
        break;
    }
  });

  ipcMain.on('import-project', (event, arg) => {
    const { directory } = arg;
    if (isExisted(directory, projectArray)) {
      event.reply('error', '项目已存在！');
    } else if (fs.existsSync(path.join(directory, 'package.json'))) {
      // eslint-disable-next-line
      const pkg = require(path.join(directory, 'package.json'));
      const id = genID();
      projectArray.unshift({
        id,
        name: pkg.name,
        description: pkg.description,
        destination: directory,
        template: 'none'
      });
      wirteJson(path.resolve(__dirname, './data/project.json'), projectArray, () => {
        event.reply('project-imported', projectArray);
      });
    } else {
      event.reply('error', 'package.json不存在！');
    }
  });

  ipcMain.on('delete-project', (event, arg) => {
    const idx = projectArray.findIndex((item) => item.id === arg);
    projectArray.splice(idx, 1);
    wirteJson(path.resolve(__dirname, './data/project.json'), projectArray, () => {
      event.returnValue = projectArray;
    });
  });

  ipcMain.on('request-project-info', (event, arg) => {
    const idx = projectArray.findIndex((item) => item.id === arg);
    const { destination } = projectArray[idx];
    const pkg = JSON.parse(fs.readFileSync(path.join(destination, 'package.json')));
    event.reply('get-project-info', { ...pkg, destination });
  });

  ipcMain.on('add-dependency', (event, arg) => {
    const { dep, destination } = arg;
    const shell =
      dep.type === 'dependencies' ? `yarn add ${dep.name} --save` : `yarn add ${dep.name} --dev`;
    handleExec({ shell, destination, detached: true }, () => {
      const pkg = JSON.parse(fs.readFileSync(path.join(destination, 'package.json')));
      event.reply('get-project-info', { ...pkg, destination });
    });
  });

  ipcMain.on('add-script', (event, arg) => {
    const { form, destination } = arg;
    const pkg = JSON.parse(fs.readFileSync(path.join(destination, 'package.json')));
    pkg.scripts[form.name] = form.script;
    wirteJson(path.join(destination, 'package.json'), pkg, () => {
      const json = JSON.parse(fs.readFileSync(path.join(destination, 'package.json')));
      event.reply('get-project-info', { ...json, destination });
    });
  });
};
