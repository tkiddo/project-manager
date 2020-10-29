const { ipcMain } = require('electron');
const path = require('path');
const taskArray = require('./data/task.json');
const { wirteJson } = require('./utils');

module.exports = function taskProcess() {
  ipcMain.on('get-task-list', (event) => {
    event.returnValue = taskArray;
  });

  ipcMain.on('create-task', (event, arg) => {
    taskArray.unshift({ ...arg, done: false });
    wirteJson(path.resolve(__dirname, 'data/task.json'), taskArray, () => {
      event.returnValue = taskArray;
    });
  });

  ipcMain.on('finish-task', (event, arg) => {
    const idx = taskArray.findIndex((item) => item.content === arg.content);
    taskArray[idx].done = true;
    wirteJson(path.resolve(__dirname, 'data/task.json'), taskArray, () => {
      event.returnValue = taskArray;
    });
  });

  ipcMain.on('delete-task', (event, arg) => {
    const idx = taskArray.findIndex((item) => item.content === arg.content);
    taskArray.splice(idx, 1);
    wirteJson(path.resolve(__dirname, 'data/task.json'), taskArray, () => {
      event.returnValue = taskArray;
    });
  });

  ipcMain.on('empty-task', (event) => {
    taskArray.splice(0, taskArray.length);
    wirteJson(path.resolve(__dirname, 'data/task.json'), taskArray, () => {
      event.returnValue = taskArray;
    });
  });
};
