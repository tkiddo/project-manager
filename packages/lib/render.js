let { render } = require('consolidate').ejs;
const { promisify } = require('util');

render = promisify(render);

module.exports = (files, data) => {
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
