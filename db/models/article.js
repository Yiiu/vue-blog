var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var articleSchema = new Schema ({
    title: String,
    author: String,
    vistits: {
        type: Number,
        default: 0
    },
    type:[{
        type: ObjectId,
        ref:"type"
    }],
    tags:[{
        type: ObjectId,
        ref:"tag"
    }],
    create_time:{
        type: Array,
    },
    update_time:{
        type: Array,
    },
    indexImg: {
        type:String,
        default: ""
    },
    enabled: Boolean,
    content: String
})
let article = mongoose.model("article", articleSchema);
module.exports = article;