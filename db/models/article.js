var mongoose = require("./db");
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
    title: String,
    author: String,
    vistits: {
        type: Number,
        default: 0
    },
    type:{
        type: Array,
        ref:"type"
    },
    tags:{
        type: Array
    },
    time: Array,
    indexImg: {
        type:String,
        default: ""
    },
    enabled: Boolean,
    content: String
})
let article = mongoose.model("article", articleSchema);
module.exports = article;