var mongoose = require("mongoose");	
var data = require("../settings");

mongoose.connect("mongodb://"+data.host+":"+data.port+"/"+data.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("MongoDB Opened!");
});

module.exports = mongoose;