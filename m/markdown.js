"use strict";
let hljs = require('highlight.js');

var md = require('markdown-it')({
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
    linkify:      false,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
});
// emoji
var emoji = require('markdown-it-emoji');
var twemoji = require('twemoji')
// Or for light version
// var emoji = require('markdown-it-emoji/light');

md.use(emoji);
md.use(require('markdown-it-checkbox'));

// checked
md.render('[ ] unchecked')
md.render('[x] checked')



md.renderer.rules.image = function (tokens, idx, options, env, self) {
    let vimeoRE = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    let token = tokens[idx],
    aIndex = token.attrIndex('src');
    return "<img src='" + token.attrs[aIndex][1] + "' data-title='" + token.content + "' data-me='" + token.attrs[aIndex][1] + "imageView2/2/w/40/interlace/1/q/100'>"
}

md.renderer.rules.emoji = function(token, idx) {
  // return "<span class='emoji'>"+twemoji.parse(token[idx].content)+"</span>";
    return twemoji.parse(token[idx].content,{
      folder: 'svg',
      ext: '.svg'
    });
};
module.exports = md
