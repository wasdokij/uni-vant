var bem = require('./bem.js').bem;
var memoize = require('./memoize.js').memoize;

function isSrc(url) {
  return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}

module.exports = {
  bem: memoize(bem),
  isSrc: isSrc,
  memoize: memoize
};