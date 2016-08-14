var mongoose = require("./db.js");
var datas = require("../settings");
var md5 = require("md5");
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

/*users.find(function(err, data){
    if(data.length == 0){
        var users = mongoose.model("login", userSchema);
        var initUser = {
            name: datas.admin,
            password: md5(datas.password),
            email: datas.email,
        }
        users.create(initUser,function(err,data){
        })
    }else {
        return
    }
})
*/
users.findUser = function(userName, callback){
    users.findOne({name:userName}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
users.addUser = function(data, callback){
    users.create(data, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = users;
