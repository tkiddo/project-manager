const { exec } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');

module.exports = (shell, callback) => (message) => {
  const spinner = ora(chalk.blueBright(message));
  spinner.start();
  exec(`${shell}`, (error) => {
    if (error) {
      console.error(`exec error: ${chalk.red(error)}`);
      process.exit(0);
    }
    spinner.succeed();
    console.log(chalk.greenBright('done.'));
    // eslint-disable-next-line no-unused-expressions
    typeof callback === 'function' && callback();
  });
};
