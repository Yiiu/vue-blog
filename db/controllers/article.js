const mongoose = require('mongoose');
const article = require("../models/article")

// 添加文章
article.add = (data, callback) => {
    article.create(data, (err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 查找一个文章
article.findO = (id, callback) => {
    article.findOne({_id:id}, (err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 查找多个文章，只返回title,content
article.findS= (s, l, callback) => {
    article.find({}, {"title":1,"content":1,"update_time":1,"author":1,"vistits":1}, {skip: s, limit: l}, (err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    }).sort({"_id":-1});
}
// 更新文章
article.up = (id, datas,callback) => {
    article.update({"_id":id},datas, (err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 删除文章
article.del = (id, callback)  => {
    article.remove({"_id":id},(err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 增加阅读量
article.vistits = (id, callback) => {
    article.update({"_id":id},{$inc:{"vistits":1}},(err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 查询
article.search = (title, cc, callback) => {
    article.find({title:cc}, {"title":1,"content":1,"time":1,"author":1,"vistits":1}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
module.exports = article;