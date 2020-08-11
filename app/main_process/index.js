// In main process.
const localDir = require('./localdir_process');
const template = require('./template_process');
const project = require('./project.process');

module.exports = function () {
  localDir();
  template();
  project();
};
