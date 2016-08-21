let mongoose = require("../db");
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

let tagSchema = new Schema({
	name:{
		type:String,
		unique:true
	},
	article:[{
		type:ObjectId,
		ref:"atricle"
	}]
})
let tag = mongoose.model("tag", tagSchema);
module.exports = tag