let mongoose = require("mongoose");
let type = require("../models/type");

type.add = function(data, callback){
    type.create(data, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
type.finds = function(callback){
    type.find({},function(err, data){
        if(err){
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
module.exports = type;