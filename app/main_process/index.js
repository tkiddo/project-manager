// In main process.
const localDir = require('./localdir_process');
const template = require('./template_process');

module.exports = function () {
  localDir();
  template();
};
