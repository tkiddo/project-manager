const axios = require('axios');
const { promisify } = require('util');
const downloadGitRepo = promisify(require('download-git-repo'));
let { render } = require('consolidate').ejs;

render = promisify(render);

const { downloadDirectory } = require('./constants');

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

module.exports = { fetchGit, downloadRepo, renderTemplate };
