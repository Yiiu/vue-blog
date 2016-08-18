let mongoose = require("mongoose");
let users = require("../models/users")

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
