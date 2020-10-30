// In main process.
const localDir = require('./localdir');
const template = require('./template');
const project = require('./project');
const eslint = require('./eslint');
const task = require('./task');
const component = require('./component');
const common = require('./common');
const collection = require('./collection');

module.exports = function mainProcess() {
  localDir();
  template();
  project();
  eslint();
  task();
  component();
  common();
  collection();
};
