const path = require('path');
const fs = require('fs');
const metalsmith = require('metalsmith');
const chalk = require('chalk');
const render = require('./render');

module.exports = (name) => (templateSrc, destDir) => {
  if (!fs.existsSync(path.resolve(destDir))) {
    fs.mkdirSync(path.resolve(destDir));
  }
  const dest = path.resolve(destDir, name);
  metalsmith(__dirname)
    .source(templateSrc)
    .destination(dest)
    .use((files, metal, done) => {
      render(files, { name });
      done();
    })
    .build((err, files) => {
      if (err) {
        return console.log(chalk.red(err));
      }
      Object.keys(files).forEach((item) => {
        console.log(chalk.greenBright(`created ${path.join(dest, item)}`));
      });
      return null;
    });
};
