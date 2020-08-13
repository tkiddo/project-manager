// In main process.
const localDir = require('./localdir_process');
const template = require('./template_process');
const project = require('./project.process');
const eslint = require('./eslint_process');

module.exports = function mainProcess() {
  localDir();
  template();
  project();
  eslint();
};
