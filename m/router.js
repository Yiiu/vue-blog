var md5 = require("md5");
var users = require("../db/users"); 
var article = require("../db/article"); 
var trimHtml = require('trim-html');
var markdown = require( "markdown" ).markdown;
var qiniu = require( "./qiniu" );

// 截断 去除html标签
String.prototype.trims = function(lengths){
    var data = this.replace(/<[^>]+>/g,"");
    if(data.length >lengths){
        return me = data.substring(0,lengths)+"...";
    }else {
        return data;
    }
}
// 截取img标签的src，假如文章没有img那就返回false 否则返回src
function imgs(str){
    var reg = /<img[^>]*src[=\'\"\s]+([^\"\']*)[\"\']?[^>]*>/gi; 
    var arr = [];
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
function day(){
    var data = new Date();
    var me = [];
    var month = data.getMonth()+1;
    var Minutes = data.getMinutes().toString();
    var Hours = data.getHours().toString();
    var Seconds = data.getSeconds().toString();
    if(Minutes <=9){
        Minutes = "0"+Minutes;
    }
    if(Hours <=9){
        Hours = "0"+Hours;
    }
    if(Seconds <=9){
        Seconds = "0"+Seconds;
    }
    me[0] = data.getFullYear()+"年"+month+"月"+data.getDay()+"日";
    me[1] = Hours+":"+Minutes+":"+Seconds
    return me
}
module.exports = function(app){
    // 登录
    app.post("/login",function(req, res, next){
        // users.findUser("")
        users.findUser(req.body.name, function( data ){
            if(data){
                if(data.name == req.body.name && data.password == md5(req.body.password)){
                    req.session.lastPage = "yes:"+data.name;
                    res.jsonp({op:"true"})
                }else if(data.name == req.body.name && data.password == req.body.password){
                    req.session.lastPage = "yes:"+data.name;
                    res.jsonp({op:"true"})
                }else {
                    res.jsonp({op:"false"})
                }
            }else {
                    res.jsonp({op:"false"})
            }
        })
    })
    // 登录检测
    app.post("/log",function(req, res, next){
        if(req.session.lastPage){
            var sessionss = req.session.lastPage.split(":");
            if(sessionss[0] == "yes"){
                res.jsonp({op:"true"})
            }else {
                res.jsonp({op:"false"})
            }
        }else {
            res.jsonp({op:"false"})
        }
    })
    // admin添加文章
    app.post("/admin/add", function(req, res, next){
        if(req.session.lastPage){
            var sessionss = req.session.lastPage.split(":");
            var articles = {
                title: req.body.title,
                author: sessionss[1],
                type: req.body.type,
                tags: req.body.tags,
                time: day(),
                enabled: true,
                content: req.body.content
            }
            article.addArticle(articles);
            res.jsonp({t:"y"})
        }
    })
    // 首页
    app.post("/index", function(req, res, next){
        article.findSArticle(req.body.t*10,10,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                for(var i=0;i<data.length;i++){
                    var a = markdown.toHTML(data[i].content);
                    if(!imgs(a)){
                    }else {
                        data[i].indexImg = imgs(a);
                    }
                    data[i].content = a.trims(120);
                }
                res.jsonp(data);
            }
        });
    })
    // 文章详情页
    app.post("/article", function(req, res, next){
        article.findOArticle(req.body.id,function(data){
            if(data =="err"){
                res.jsonp({op:"false"})
            }else {
                article.upvistits(req.body.id, function(data){});
                data.content = markdown.toHTML(data.content);
                res.jsonp(data);
            }
        });
    })
    app.post("/admin", function(req, res, next){
        article.findAArticle(0,10,function(data){
            res.jsonp(data);
        });
    })
    app.post("/admin/id", function(req, res, next){
        article.findOArticle(req.body.id,function(data){
            res.jsonp(data);
        });
    })
    app.post("/admin/update", function(req, res, next){
        article.upArticle(req.body.id,req.body.data,function(data){
            res.jsonp({op:"true"})
        });
    })
    app.post("/admin/del", function(req, res, next){
        if(toString.apply(req.body.id) == "[object Array]"){
            req.body.id.forEach(function(item){
                article.delArticle(item,function(data){
                })
            })
            res.jsonp({op:"true"})
        }else {
            article.delArticle(req.body.id,function(data){
                res.jsonp({op:"true"})
            });
        }
    })
    app.post("/querys", function(req, res, next){
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
    })
    app.post("/upload", function(req, res, next){
        console.log(req.files )
        //qiniu(req.body.file)
    })
}