var mongoose = require("./db.js");
var datas = require("../settings");
var md5 = require("md5");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
})
var users = mongoose.model("login", userSchema);

users.find(function(err, data){
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

users.findUser = function(userName, callback){
    users.findOne({name:userName}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = users;