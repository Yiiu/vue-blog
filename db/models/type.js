"use strict";
let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let typeSchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    alias:{
        type:String,
        unique:true
    },
    profile:String,
    article:[{
        type:ObjectId,
        ref:"article"
    }]
})

let type = mongoose.model("type", typeSchema);

type.all = (callback) => {
    let data = type
    .find()
    .exec(callback)
}

type.allArticle = (alias) => {
    return type
    .findOne({alias:alias})
    .lean()
    .populate({
        path: "article",
        select: "title cover create_time profile enabled"
    })
    .sort({'create_time':-1})
    .exec()
}
type.allIdArticle = (id) => {
    return type
    .findById(id)
    .lean()
    .populate({
        path: "article",
        select: "_id"
    })
    .sort({'create_time':-1})
    .exec()
}

type.num = (callback) => {
    type.count((err,data)=>{
        if(err){
            callback(err)
        }else {
            callback(data)
        }
    })
}

type.del = (id) =>{
    return type.remove({"_id":id})
}

module.exports = type;