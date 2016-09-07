let mongoose = require("mongoose");
let type = require("../models/type");
let article = require("./article")

// 添加标签
exports.add = (req, res)=>{
    type.create(req.body, (err, data)=>{
        if(err){
            res.jsonp({
                "status":"fail",
                "msg":"发布失败"
            })
        }else {
            res.jsonp({
                "status":"success",
            })
        }
    });
}
exports.finds = (req, res)=>{
    type.find({}, (err, data)=>{
        if(err){
            res.jsonp({
                "status":"fail",
                "msg":"发布失败"
            })
        }else {
            res.jsonp({
                "status":"success",
                "data":data
            })
        }
    });
}

// 添加标签文章
exports.addArt = (tag,id,callback) => {
    type.update({"_id":tag},{"$addToSet":{"article":id}},callback)
}
// 删除type里的文章 
exports.delArt = (types, id, callback) => {
    type.update({"_id":types}, {"$pull":{"article":id}}, callback)
} 
/*

// 查询标签
// 删除文章标签，先删除type的文章，然后更改文章的type
type.delid = function(tag, id, callback){
    type.update({"_id":tag},{"$pull":{"article":id}},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
 */