let article = require("../../db/controllers/article");

let md = require("../markdown");
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
    let img = /<img[^>]*>/gi;
    let imgs = str.match(img);
    let arr = [];
    let _img = [];
    if(imgs != null){
        _img =  imgs.filter(function(el){
            if(!/emoji/.test(el)){
                return el;
            }
        })
    }
    while (reg.exec(_img)) {
        arr.push(RegExp.$1);
    }
    if(arr.length == 0){
        return false;
    }else {
        return arr[0];
    }
}
// 格式化日期

module.exports = {
    // 首页
    index:function(req, res, next){
        article.findS(req.body.t*10,10,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                for(var i=0;i<data.length;i++){
                    var a = md.render(data[i].content);
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
        article.findO(req.body.id,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                article.vistits(req.body.id, function(data){});
                data.content = md.render(data.content);
                res.jsonp(data);
            }
        });
    },
    search: function(req, res, next){
        var qs=new RegExp(req.body.cc);
        article.search(req.body.title,qs, function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                if(data == ""){
                    res.jsonp({op:"false"});
                }else {
                    for(var i=0;i<data.length;i++){
                        var a = md.render(data[i].content);
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
