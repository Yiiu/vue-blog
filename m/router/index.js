let article = require("../../db/article");

let hljs = require('highlight.js');
let marked = require('marked');

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
var emoji = require('markdown-it-emoji');
// Or for light version
// var emoji = require('markdown-it-emoji/light');

md.use(emoji);

var twemoji = require('twemoji')

md.render.heading = function (text, level){
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
}

md.renderer.rules.emoji = function(token, idx) {
  // return "<span class='emoji'>"+twemoji.parse(token[idx].content)+"</span>";
  return twemoji.parse(token[idx].content);
};

// 截断 去除html标签
String.prototype.trims = function(lengths){
    let data = this.replace(/<[^>]+>/g,"");
    if(data.length >lengths){
        return me = data.substring(0,lengths)+"...";
    }else {
        return data;
    }
}
// 截取img标签的src，假如文章没有img那就返回false 否则返回src
function imgs(str){
    let reg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi;
    let arr = [];
    while (reg.exec(str)) {
        arr.push(RegExp.$1);
    }
    if(arr.length == 0){
        return false;
    }else {
        return arr[0];
    }
}
// 格式化日期

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});

module.exports = {
    // 首页
    index:function(req, res, next){
        article.findSArticle(req.body.t*10,10,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                for(var i=0;i<data.length;i++){
                    var a = marked(data[i].content);
                    if(!imgs(a)){
                    }else {
                        data[i].indexImg = imgs(a);
                    }
                    data[i].content = a.trims(120);
                }
                res.jsonp(data);
            }
        });
    },
    // 文章详情页
    article:function(req, res, next){
        article.findOArticle(req.body.id,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                article.upvistits(req.body.id, function(data){});
                data.content = md.render(data.content);
                res.jsonp(data);
            }
        });
    },
    search: function(req, res, next){
        var qs=new RegExp(req.body.cc);
        article.querys(req.body.title,qs, function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                if(data == ""){
                    res.jsonp({op:"false"});
                }else {
                    for(var i=0;i<data.length;i++){
                        var a = markdown.toHTML(data[i].content);
                        if(!imgs(a)){
                        }else {
                            data[i].indexImg = imgs(a);
                        }
                        data[i].content = a.trims(50);
                    }
                    res.jsonp(data);
                }
            }
        });
    }
}
