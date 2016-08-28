const article = require("../../db/controllers/article");
const type = require("../../db/controllers/type");
const tag = require("../../db/controllers/tag");
const async = require('async');
const Promise = require("bluebird")
const co = require("co");
// 格式化日期
function day(){
    let data = new Date();
    let me = [];
    let month = data.getMonth()+1;
    let Minutes = data.getMinutes().toString();
    let Hours = data.getHours().toString();
    let Seconds = data.getSeconds().toString();
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
    articleAdd: (req, res, next) => {
        if(req.session.sign == "true"){
            var articles = {
                title: req.body.title,
                author: req.session.name,
                enabled: true,
                content: req.body.content,
                update_time:day(),
                create_time:day()
            }
            if(req.body.type != ""){
                articles.type = req.body.type
            }
            article.add(articles, (data) => {
                if(data == "err"){
                    res.jsonp({op:"false"});
                }else {
                    req.body.tags.forEach((item) =>{
                        tag.findO(item,(tags) => {
                            if(tags==null || tags == ""){
                                tag.add({"name":item}, (tagss) => {
                                    tag.addArticle(tagss._id, data._id, function(tagsss){
                                        article.upTags(data._id, tagss._id, function(tagssss){
                                        })
                                    })
                                })
                            }else{
                                tag.addArticle(tags._id, data._id, function(tagsss){
                                    article.upTags(data._id, tags._id, function(tagssss){
                                    })
                                })
                            }
                        })
                    })
                    if(req.body.type != ""){
                        // 把这篇文章添加到type的acritle里去
                        type.addid(req.body.type, data._id, (data) => {
                        })
                    }
                    res.jsonp({op:"true"});
                }
            });
        }
    },
    index: (req, res, next) => {
        if(req.session.sign == "true"){
            article.findS(0,10,(data) => {
                res.jsonp(data);
            });
        }else {
            res.jsonp({op:"false"});
        }
    },
    // 获取文章
    edit: (req, res, next) => {
        co(function *(){
            article
            .findById(req.body.id)
            .populate("tags")
            .populate("type")
            .exec((err, data)=>{
                console.log(data)
                res.jsonp(data)
            })
        })
    },
    update: (req, res, next) => {
        if(req.session.sign == "true"){
            if(req.body.data.type == ""){
                req.body.data.type = null
            }
            article.up(req.body.id,req.body.data,(data) => {
                type.addid(req.body.data.type, req.body.id, (types) => {
                    type.delid(req.body.oldtype, req.body.id, (types) => {
                    })
                })
            });
            // tag 假如原始tag没存在于心的tag里，删除tag里的此文章，删除文章中的此tag
            // 否则，检测tag是否存在，假如不存在就创建，添加文章，假如存在添加文章
            console.log(req.body.oldtag);
            console.log(req.body.tags);
            if(req.body.oldtag == ""){
            }else {
                req.body.oldtag.forEach((i) => {
                    if(req.body.indexOf < 0){
                        console.log(i.name);
                    }
                })
            }
        }else {
            res.jsonp({op:"false"});
        }
    },
    del:(req, res, next) => {
        if(req.session.sign == "true"){
            if(toString.apply(req.body.id) == "[object Array]"){
                req.body.id.forEach((item) => {
                    article.findO(item, (data) => {
                        if(data != "err"){
                            article.del(data._id,(del) => {
                                if(data != "err"){
                                    type.delid(data.type,data._id, () => {
                                        res.jsonp({op:"true"})
                                    })
                                }
                            });
                        }
                    })
                })
            }else {
                article.findO(req.body.id, (data) => {
                    if(data != "err"){
                        article.del(data._id,(del) => {
                            if(data != "err"){
                                if(data.type != ""||data.type != null){
                                    type.delid(data.type,data._id, () => {
                                        res.jsonp({op:"true"})
                                    })
                                }else {
                                    res.jsonp({op:"true"})
                                }
                            }
                        });
                    }
                })
            }
        }else {
            res.jsonp({op:"false"});
        }
    },
    addtype: (req, res, next) => {
        if(req.session.sign == "true"){
            type.add(req.body, (data) => { 
                res.jsonp(data)
            })
        }else {
            res.jsonp({op:"false"});
        }
    },
    types: (req, res, next) => {
        type.finds((data) => {
            res.jsonp(data);
        })
    },
    tags: (req, res, next) => {
        co(function *(){
            article
            .findById(req.body.id)
            .populate("tags")
            .exec((err, data)=>{
            })
        })
    },

}
