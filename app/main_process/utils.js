const axios = require('axios');
const { promisify } = require('util');
const downloadGitRepo = promisify(require('download-git-repo'));
const { exec } = require('child_process');
const { dialog } = require('electron');
let { render } = require('consolidate').ejs;
const fs = require('fs');

render = promisify(render);

const { downloadDirectory } = require('./constants');

const handleError = (error) => {
  dialog.showErrorBox('boom!', JSON.stringify(error));
};

const fetchGit = async (url) => {
  const { data } = await axios({
    url,
    headers: {
      Accept: 'application/vnd.github.v3+json,application/json'
    }
  });
  return data;
};

// eslint-disable-next-line camelcase
const downloadRepo = async ({ name, full_name }) => {
  const dest = `${downloadDirectory}/.sliver-cli/${name}`;
  await downloadGitRepo(full_name, dest);
  return dest;
};

const renderTemplate = (files, data) => {
  Object.keys(files).forEach(async (item) => {
    if (item.includes('js') || item.includes('json') || item.includes('md')) {
      let content = files[item].contents.toString();
      if (content.includes('<%')) {
        content = await render(content, data);
        if (item.includes('json')) {
          content = JSON.stringify(JSON.parse(content), null, 2);
        }
        // eslint-disable-next-line no-param-reassign
        files[item].contents = Buffer.from(content);
      }
    }
  });
};

const handleExec = ({ destination, shell }, callback) => {
  exec(`cd /d ${destination} && ${shell}`, (error) => {
    if (error) {
      handleError(error);
      process.exit(0);
    }
    // eslint-disable-next-line no-unused-expressions
    typeof callback === 'function' && callback();
  });
};

const wirteJson = (file, data, callback) => {
  const str = JSON.stringify(data, null, '\t');
  fs.writeFile(file, str, (err) => {
    if (err) {
      console.error(err);
    } else {
      callback();
    }
  });
};

const isExisted = (destination, array) => {
  const idx = array.findIndex((item) => item.destination === destination);
  return idx !== -1;
};

module.exports = {
  fetchGit,
  downloadRepo,
  renderTemplate,
  handleError,
  handleExec,
  wirteJson,
  isExisted
};
