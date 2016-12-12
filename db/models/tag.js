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

tag.add = function(data){
    return tag.create({"name":data})
}

tag.findId = function(id, callback){
    return tag.findById(id).exec()
}

tag.findName = function(name){
    return tag.findOne({"name":name}).exec()
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
tag.addArticle = function(tags,id){
    return tag.update({"_id":tags},{"$addToSet":{"article":id}})
}
// 删除文章到tag：article
tag.delArticle = function(tags,id,callback){
    return tag.update({"_id":tags},{"$pull":{"article":id}})
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
