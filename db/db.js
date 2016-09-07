"use strict";
let mongoose = require("mongoose");	
let data = require("../settings");

mongoose.Promise = require("bluebird")

mongoose.connect("mongodb://"+data.host+":"+data.port+"/"+data.db);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("MongoDB Opened!");
});

module.exports = mongoose;