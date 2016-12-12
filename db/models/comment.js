"use strict";
var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var commentSchema = Schema ({
    /* 谁评论 */
    from : {
        admin:{
            type:ObjectId,
            ref:"user",
        },
        user:{
            type:Object,
        }
    },
    /* 评论谁*/
    reply:{
        type:ObjectId,
        ref:'comment'
    },
    /* 评论的文章 */
    article : {
        required : true,
        type: ObjectId,
        ref:"article",
        unique:true
    },
    /* 内容 */
    content : {
        type : String,
        default : ''
    },
    /* 评论时间 */
    create_time : {
        type : Date,
        default : Date.now
    },
    os:{
        type : String,
    },
    // 0正常，1待审，-1删除
    state:{
        type : Number,
        default : 0
    }
})

let comment = mongoose.model("comment", commentSchema)

comment.add = (data, callback) => {
    return comment.create(data)
}
// 文章页面的评论
comment.finds = (article) => {
    return comment.find({article:article})
    .lean()
    .populate("reply")
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .where("state").equals(0)
    //.sort({'create_time':-1})
    .exec()
}

comment.all = (article) => {
    return comment.find()
    .lean()
    .populate("reply")
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}
comment.findsId = (id) => {
    return comment.findById(id)
    .lean()
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .populate("reply")
    .exec()
}
comment.findChild = (id) => {
    return comment.find()
    .where("reply").equals(id)
    .lean()
    .populate("reply")
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}

comment.findsChild = (article) => {
    return comment.find({article:article})
    .lean()
    .where("reply").exists(true)
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}
comment.del = (id) => {
    return comment.update({state:-1})
}

module.exports = comment