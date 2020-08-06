const axios = require('axios');
const { promisify } = require('util');
const downloadGitRepo = promisify(require('download-git-repo'));

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

module.exports = { fetchGit, downloadRepo };
