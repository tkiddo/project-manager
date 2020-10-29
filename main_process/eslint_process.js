const { ipcMain } = require('electron');
const rules = require('./data/rules.json');

module.exports = function eslintProcess() {
  ipcMain.on('get-eslint-rules', (event) => {
    event.returnValue = rules;
  });
};
