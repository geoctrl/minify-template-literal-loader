const minify = require('html-minifier').minify;
const getOptions = require('loader-utils').getOptions;

module.exports = function(src) {

  let str = src.match(/`(?:[^`\\]|\\.)*`/g);
  // return early to skip files without template literals
  if (!str) return src

  // remove line breaks before grabbing export
  let removeLineBreak = src.replace(/[\n|\r]/gm, ' ');
  let exp = removeLineBreak.match(/^(.*?)`/g);

  if (!exp) throw Error(`\n\n[minify-template-literal-loader] Unable to process export method.\n`)

  let html = eval(str[0]);
  let result = minify(html, getOptions(this));

  return `${exp[0].trim()}${result}\``;
};