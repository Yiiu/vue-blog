let article = require("../../db/controllers/article");
let type = require("../../db/controllers/type");
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
    me[0] = data.getFullYear()+"年"+month+"月"+data.getDate()+"日";
    me[0] = data.getFullYear()+"年"+month+"月"+data.getDay()+"日";
    me[1] = Hours+":"+Minutes+":"+Seconds
    return me
}
module.exports = {
    articleAdd: function(req, res, next){
        if(req.session.sign == "true"){
            var articles = {
                title: req.body.title,
                author: req.session.name,
                type: req.body.type,
                tags: req.body.tags,
                enabled: true,
                content: req.body.content,
                update_time:day(),
                create_time:day()
            }
            article.add(articles, function(data){
                if(data = "err"){
                    res.jsonp({op:"false"});
                }else {
                    res.jsonp({op:"true"});
                }
            });
        }
    },
    index: function(req, res, next){
        if(req.session.sign == "true"){
            article.findS(0,10,function(data){
                res.jsonp(data);
            });
        }else {
            res.jsonp({op:"false"});
        }
    },
    // 获取文章
    edit: function(req, res, next){
        if(req.session.sign == "true"){
            article.findO(req.body.id,function(data){
                res.jsonp(data);
            });
        }else {
            res.jsonp({op:"false"});
        }
    },
    update: function(req, res, next){
        if(req.session.sign == "true"){
            article.up(req.body.id,req.body.data,function(data){
                res.jsonp({op:"true"})
            });
        }else {
            res.jsonp({op:"false"});
        }
    },
    del:function(req, res, next){
        if(req.session.sign == "true"){
            if(toString.apply(req.body.id) == "[object Array]"){
                req.body.id.forEach(function(item){
                    article.del(item,function(data){
                    })
                })
                res.jsonp({op:"true"})
            }else {
                article.del(req.body.id,function(data){
                    res.jsonp({op:"true"})
                });
            }
        }else {
            res.jsonp({op:"false"});
        }
    },
    addtype: function(req, res, next){
        if(req.session.sign == "true"){
            type.add(req.body, function(data){ 
                res.jsonp(data)
            })
        }else {
            res.jsonp({op:"false"});
        }
    },
    types: function(req, res, next){
        type.finds(function(data){
            res.jsonp(data);
        })
    } 

}
