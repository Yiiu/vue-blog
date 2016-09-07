"use strict";
let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let tagSchema = new Schema({
	name:{
		type:String,
		unique:true
	},
	article:[{
		type:ObjectId,
		ref:"atricle"
	}]
})
let tag = mongoose.model("tag", tagSchema);

tag.add = function(data, callback){
    tag.create({"name":data}, callback)
}

tag.findId = function(id, callback){
    tag.findById(id, callback)
}

tag.findName = function(name, callback){
    tag.findOne({"name":name}, callback)
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

tag.del = function(tags, callback){
    tag.remove({"_id":tags} ,callback)
}



// 查询所有tag
tag.finds = function(callback){
    tag.find({}, callback)
}

// 添加文章到tag：article
tag.addArticle = function(tags,id,callback){
    tag.update({"_id":tags},{"$addToSet":{"article":id}},callback)
}
// 删除文章到tag：article
tag.delArticle = function(tags,id,callback){
    tag.update({"_id":tags},{"$pull":{"article":id}},callback)
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
module.exports = tag