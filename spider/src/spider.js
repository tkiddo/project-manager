const { promisify } = require('util');
const request = promisify(require('request'));
const fs = require('fs');
const path = require('path');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

const createOptions = () => {
  return {
    url: 'http://eslint.cn/docs/rules/',
    method: 'GET',
    json: true,
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
    }
  };
};

module.exports = async () => {
  const result = [];
  const { body } = await request(createOptions());
  const doc = new dom().parseFromString(body);
  const infoSelectors = xpath.select('//tbody/tr[@class="rule-zh"]', doc);

  infoSelectors.forEach((item, idx) => {
    const str = new dom().parseFromString(item.toString());
    const recommendedNode = xpath.select('//td[1]/span[@title="recommended"]', str);
    const fixableNode = xpath.select('//td[2]/span[@title="fixable"]', str);
    const nameNode = xpath.select('//td[3]/p/a', str);
    const name = nameNode[0].firstChild.data;
    const descriptionNode = xpath.select('//td[last()]/p', str);
    let description = '';
    Array.prototype.slice.call(descriptionNode[0].childNodes).forEach((item) => {
      if (item.firstChild) {
        description += item.firstChild.data;
      } else {
        description += item.data;
      }
    });
    result.push({
      recommended: recommendedNode.length > 0,
      fixable: fixableNode.length > 0,
      name,
      description
    });
  });

  fs.writeFile(
    path.resolve(__dirname, 'data/data.json'),
    JSON.stringify(result, null, '\t'),
    (err) => {
      if (err) {
        console.log('error...');
      }
    }
  );
};
