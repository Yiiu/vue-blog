"use strict";
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