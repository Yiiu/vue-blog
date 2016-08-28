const mongoose = require('mongoose');
const article = require("../models/article")
const type = require("../models/type");
const tag = require("../models/tag");
const co = require('co');



exports.index = (req, res)=>{
    co(function *(){
        const page = req.body.t;
        const limit = 10;
        let data = yield article
            .find()
            .skip(page*limit)
            .limit(limit)
            .exec()
        try{
            res.json({
                status:"success",
                data:data
            })
        } catch(err){
            res.json({
                status:"fail",
                msg:"加载失败"
            })
        }
    })
}
exports.edit = (req, res)=>{
    co(function *(){
        const id = req.body.id;
        let data = yield article
            .findById(id)
            .populate({
                path: "tags",
                select: "name _id"
            })
            .populate({
                path: "type",
                select: "name _id"
            })
            .exec()
        try{
            res.json({
                status:"success",
                data:data
            })
        } catch(err){
            res.json({
                status:"fail",
                msg:"加载失败"
            })
        }
    })
}
exports.add = (req, res)=>{
    co(function *(){
        
    })
}
// 添加文章
/*
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
// 添加tag
article.upTags = (id, tags,callback) => {
    article.update({"_id":id},{"$addToSet":{"tags":tags}}, (err, data) => {
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 删除tag
article.upTags = (id, tags,callback) => {
    article.update({"_id":id},{"$addToSet":{"tags":tags}}, (err, data) => {
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
*/