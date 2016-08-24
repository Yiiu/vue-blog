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
// 查询一个tag
tag.findId = function(name,callback){
    tag.findOne({"_id":name},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 查询一个tag
tag.findO = function(name,callback){
    tag.findOne({"name":name},function(err, data){
        if(err){
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
tag.addArticle = function(tags,id,callback){
    tag.update({"_id":tags},{"$addToSet":{"article":id}},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
// 删除tag文章
tag.delid = function(tags, id, callback){
    tag.update({"_id":tags},{"$pull":{"article":id}},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
tag.del = function(tags, id, callback){
    tag.remove({"_id":tags} ,function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = tag;