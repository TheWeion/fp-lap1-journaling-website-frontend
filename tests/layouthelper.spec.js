const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const page = new JSDOM(html);

module.exports = page;