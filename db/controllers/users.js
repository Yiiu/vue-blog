const mongoose = require("mongoose");
const users = require("../models/users")
const co = require('co');
const md5 = require("md5");

exports.login = (req, res) => {
    let name = req.body.name;
    let password = md5(req.body.password);
    co( function*() {
        return users
        .findOne({"name":name})
        .exec()
    }).then((data)=>{
        console.log(data)
        if(data == null){
            res.jsonp({
                "status":"fail",
                "msg":"账号错误"
            })
        }else {
            if(name == data.name &&  password == data.password){
                req.session.name = data.name;
                req.session.sign = "true";
                res.jsonp({
                    "status":"success",
                })
            }else if (password != data.password){
                res.jsonp({
                    "status":"fail",
                    "msg":"密码错误"
                })
            }
        }
    })
}
exports.checkLogin = (req, res, next) => {
    if(req.session.sign == "true") {
        res.jsonp({
            "status":"success",
            "name":req.session.name
        })
        next()
    } else {
        res.jsonp({
            "status":"fail"
        })
        return false;
    }
}
exports.requiresLogin = (req, res, next) => {
    if(req.session.sign == "true") {
        next()
    } else {
        res.jsonp({
            "status":"fail",
            "msg":"请登录！！！！"
        })
    }
}
exports.logon = (req, res) => {

}
/*
users.finds = function(userName, callback){
    users.findOne({name:userName}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
users.add= function(data, callback){
    users.create(data, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = users;

*/