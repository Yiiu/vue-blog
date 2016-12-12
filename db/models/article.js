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
    time:[{
        type:String,
        default: ""
    }],
    cover: {
        type:String,
        default: ""
    },
    full:{
        type:Boolean,
        default: false
    },
    enabled: Boolean,
    content: String
})
let article = mongoose.model("article", articleSchema);

article.all = (page, limit) => {
    if(limit == null) {
        limit = 10;
    }
    return article
    .find()
    .skip(page*limit)
    .limit(limit)
    .populate({
        path: "author",
        select: "name _id avatar profile"
    })
    .populate({
        path: "type",
        select: "name _id alias"
    })
    .populate({
        path: "tags",
        select: "name"
    })
    .sort({'create_time':-1})
    .exec()
}
article.one = (id) => {
    return article
    .findById(id)
    .populate({
        path: "author",
        select: "name _id avatar profile"
    })
    .populate({
        path: "tags",
        select: "name _id"
    })
    .populate({
        path: "type",
        select: "name _id alias"
    })
    .exec()
}
article.num = () => {
    return article.count().exec()
}
article.add = (data) => {
    return article.create(data)
}

article.addTag = (id, tag, callback) => {
    article.update({"_id":id},{"$addToSet":{"tags":tag}},callback)
}
article.delType = (id, callback) => {
    article.update({"_id":id}, {$unset:{"type":1}},callback)
}
article.del = (id) => {
    return article.remove({"_id":id});
}
module.exports = article;
