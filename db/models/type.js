"use strict";
let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let typeSchema = new Schema({
	name:{
		type:String,
		unique:true
	},
	profile:String,
	article:[{
		type:ObjectId,
		ref:"atricle"
	}]
})
let type = mongoose.model("type", typeSchema);



module.exports = type;