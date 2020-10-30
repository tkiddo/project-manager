const { ipcMain } = require('electron');
const path = require('path');
const collectionArray = require('./data/collection.json');
const { wirteJson } = require('./utils');

module.exports = function collectionProcess() {
  ipcMain.on('get-collection-list', (event) => {
    event.returnValue = collectionArray;
  });

  ipcMain.on('create-collection', (event, arg) => {
    collectionArray.unshift({ ...arg, done: false });
    wirteJson(path.resolve(__dirname, 'data/collection.json'), collectionArray, () => {
      event.returnValue = collectionArray;
    });
  });

  ipcMain.on('delete-collection', (event, arg) => {
    const idx = collectionArray.findIndex((item) => item.content === arg.content);
    collectionArray.splice(idx, 1);
    wirteJson(path.resolve(__dirname, 'data/collection.json'), collectionArray, () => {
      event.returnValue = collectionArray;
    });
  });

  ipcMain.on('empty-collection', (event) => {
    collectionArray.splice(0, collectionArray.length);
    wirteJson(path.resolve(__dirname, 'data/collection.json'), collectionArray, () => {
      event.returnValue = collectionArray;
    });
  });
};
