const path = require('path');
const generateTemplate = require('../lib/generateTemplate');

module.exports = (storeName) => {
  const templateSrc = path.resolve(__dirname, '../templates/react/store-template');
  const destDir = 'store';
  generateTemplate(storeName)(templateSrc, destDir);
};
