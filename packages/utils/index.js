const ora = require('ora');
const chalk = require('chalk');

const upperCaseTheFirstLetter = (string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  string.substring(0, 1).toUpperCase() + string.substring(1);

const handleAwait = (promise) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  promise
    .then((data) => [data])
    .catch((err) => {
      console.log(err);
      return [null, err];
    });

const waitFnPending = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await fn(...args);
  spinner.succeed(chalk.greenBrightBright('done.'));
  return result;
};

module.exports = {
  upperCaseTheFirstLetter,
  handleAwait,
  waitFnPending
};
