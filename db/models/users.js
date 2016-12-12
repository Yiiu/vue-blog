"use strict";
var mongoose = require("../db.js");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {             // 登录名
        type:String,
        unique:true,
        index: true
    },
    password: String,
    email: {
        type:String,
        unique:true
    },
    emailmd5:{
        type:String,
        unique:true
    },
    profile: {      // 简介
        type:String,
        default:"这个人很懒，啥也没留下。。。"
    },
    avater: {
        type:String,
        default:""
    },
    create_data:{
        type: Date,
        default: Date.now
    },
})
var users = mongoose.model("user", userSchema);

users.finds = (id) => {
    return users.findById(id)
    .select("name emailmd5 avater profile _id")
    .exec()
}

module.exports = users;