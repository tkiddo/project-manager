const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CLIEngine } = require('eslint');
const chalk = require('chalk');
const fs = require('fs');
const { waitFnPending } = require('../utils/index');

const getConfigFile = () => {
  const cwd = process.cwd();
  return fs.existsSync(path.join(cwd, '.eslintrc.json'))
    ? path.join(cwd, '.eslintrc.json')
    : fs.existsSync(path.join(cwd, '.eslintrc.js'))
    ? path.join(cwd, '.eslintrc.js')
    : null;
};
module.exports = (...destDir) => {
  const config = getConfigFile() ? require(getConfigFile()) : null;
  if (!config) {
    return console.log(chalk.redBright('please add a configFile first ,like .eslintrc.json'));
  }
  const cli = new CLIEngine({ baseConfig: config });

  const fn = (destDir) => {
    const { results } = cli.executeOnFiles(destDir);
    results.forEach((item) => {
      if (item.messages.length > 0) {
        console.log(chalk.yellowBright(`\nfilePath: ${item.filePath}`));
        item.messages.forEach((item) => {
          const { line, column, message, severity } = item;
          const preText = severity === 1 ? 'warning' : severity === 2 ? 'error' : 'other';
          console.log(chalk.redBright(`[${line},${column}]:    ${preText}:${message}`));
        });
      }
    });
    return results;
  };
  waitFnPending(fn, chalk.blueBright('linting ... '))(destDir);
};
