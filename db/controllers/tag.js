let mongoose = require("mongoose");
let tag = require("../models/tag");

// 添加tag
tag.add = function(data, callback){
    tag.create(data, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}

// 查询tag
tag.finds = function(callback){
    tag.find({},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 添加tag文章
tag.addid = function(tag,id,callback){
    tag.update({"_id":tag},{"$addToSet":{"article":id}},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 删除tag文章
tag.delid = function(tag, id, callback){
    tag.update({"_id":tag},{"$pull":{"article":id}},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = tag;