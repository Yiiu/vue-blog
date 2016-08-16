var mongoose = require("./db.js");
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
    profile: {      // 简介
        type:String,
        default:"这个人很懒，啥也没留下。。。"
    },
    avatar:String,
    create_data:{
        type: Date,
        default: Date.now
    },
})
var users = mongoose.model("login", userSchema);