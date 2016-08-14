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
        ref:"articleType"
    },
    tags:{
        type: Array,
        ref:"articleTag"
    },
    time: Array,
    indexImg: {
        type:String,
        default: ""
    },
    enabled: Boolean,
    content: String
})
// 添加文章
var article = mongoose.model("article", articleSchema);
article.addArticle = function(data){
    article.create(data);
}
// 查找一个文章
article.findOArticle = function(id, callback){
    article.findOne({_id:id}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 查找多个文章，只返回title,content
article.findSArticle = function(s, l, callback){
    article.find({}, {"title":1,"content":1,"time":1,"author":1,"vistits":1}, {skip: s, limit: l}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 查找多个文章，只返回title
article.findAArticle = function(s, l, callback){
    article.find({}, {"title":1,"time":1,"author":1}, {skip: s, limit: l}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 更新文章
article.upArticle = function(id, datas,callback){
    article.update({"_id":id},datas, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 删除文章
article.delArticle = function(id, callback){
    article.remove({"_id":id},function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
// 增加阅读量
article.upvistits = function(id, callback){
    article.update({"_id":id},{$inc:{"vistits":1}},function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    })
}
article.querys = function(title, cc, callback){
    article.find({title:cc}, {"title":1,"content":1,"time":1,"author":1,"vistits":1}, function(err, data){
        if (err) {
            return callback("err");
        }else {
            return callback(data);
        }
    });
}
module.exports = article;
