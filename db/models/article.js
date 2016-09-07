"use strict";
var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var articleSchema = new Schema ({
    title: {
        type: String,
        unique:true,
    },
    author: {
        type: ObjectId,
        ref:"user"
    },
    vistits: {
        type: Number,
        default: 0
    },
    type:{
        type: ObjectId,
        ref:"type"
    },
    tags:[{
        type: ObjectId,
        ref:"tag"
    }],
    create_time:{
        type : Date, 
        default: Date.now
    },
    update_time:{
        type : Date, 
        default: Date.now
    },
    indexImg: {
        type:String,
        default: ""
    },
    enabled: Boolean,
    content: String
})
let article = mongoose.model("article", articleSchema);

article.finds = (page, limit , callback) => {
    if(limit == null) {
        limit = 10;
    }
    article
    .find()
    .skip(page*limit)
    .limit(limit)
    .populate({
        path: "author",
        select: "name _id avatar profile"
    })
    .populate({
        path: "type",
        select: "name _id"
    })
    .populate({
        path: "tags",
        select: "name"
    })
    .exec(callback)
}
article.edit = (id, callback) => {
    article
    .findById(id)
    .populate({
        path: "tags",
        select: "name _id"
    })
    .populate({
        path: "type",
        select: "name _id"
    })
    .exec(callback)
}
article.add = (data, callback) => {
    article.create(data, callback)
}

article.addTag = (id, tag, callback) => {
    article.update({"_id":id},{"$addToSet":{"tags":tag}},callback)
}
article.del = (id,callback) => {
    article.remove({"_id":id},callback);
}
module.exports = article;