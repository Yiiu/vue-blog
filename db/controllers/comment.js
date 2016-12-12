const comment = require("../models/comment")

const users = require("../models/users");
const { wrap: async } = require('co');
const thunkify = require('thunkify-wrap');

var {isEmail, isEmpty, isLength} = require('validator');
const md5 = require("md5");
const moment = require('moment')
moment.locale('zh-cn');



exports.add = async(function *(req, res){
    let data = {}
    data.from = {}
    for(var i in req.body){
        data[i] = req.body[i]
    }
    if(req.session.sign){
        if(isEmpty(req.body.content)) {
            return res.json({
                status:"fail",
                msg:"请输入昵称"
            })
        }
        data.from.admin = req.session._id
    }else {
        if(isEmpty(data.user.name)){
            return res.json({
                status:"fail",
                msg:"请输入昵称"
            })
        }
        if(isEmpty(data.user.email)){
            return res.json({
                status:"fail",
                msg:"请输入email"
            }) 
        }else if(!isEmail(data.user.email)){
            return res.json({
                "status":"fail",
                "msg":"邮箱格式不正确"
            })
        }
        data.from.user = req.body.user
    }
    if(req.body.reply) {
        data.reply = req.body.reply
    }
    comment.add(data)
    .then((datas)=>{
        res.json({
            status:"success",
            data:datas
        }) 
    })
})

exports.findChilds = async(function *(req, res){
    const id = req.params.id
    let datas = []
    rr(id)
    function rr(ids){
        comment.findsId(ids)
        .then(data=>{
            data.create_time = [moment(data.create_time).format('lll'), moment(data.create_time).fromNow()]
            if(data.state != 0){
                data.from = {}
                data.content = "此评论已被删除。"
                data.from = {
                        user:{
                            name:"评论已被删除",
                            email:"---"
                        }
                    }
                data.os = "无"
            }
            if(data.reply){
                if(data.reply.from.admin){
                    users.finds(data.reply.from.admin)
                    .then(e=>{
                        data.reply.from.admin = e
                    })
                }
                datas.push(data)
                rr(data.reply)
            }else {
                datas.push(data)
                res.json({
                    status:"success",
                    data:datas.reverse()
                }) 
            }
        }).catch(err=>{
            res.json({
                status:"fail"
            }) 
        })
    }
})
exports.findAll = async(function *(req, res){
    let data = yield comment.all(req.params.id)

    for(let comments of data){

        comments.create_time = [moment(comments.create_time).format('lll'), moment(comments.create_time).fromNow()]
    }
    
    return res.json({
        status:"success",
        data:data
    })
})
exports.finds = async(function *(req, res){
    let data = yield comment.finds(req.params.id)
    let comm = data

    for(let comments of comm){

        comments.create_time = [moment(comments.create_time).format('lll'), moment(comments.create_time).fromNow()]

        if(comments.from.user) {
            comments.from.user.email = md5(comments.from.user.email)
        }

        if(comments.reply) {
            comments.child = true
            if(comments.reply.from.admin){
                let admin = yield users.finds(comments.reply.from.admin)
                comments.reply.from.admin = admin
            }
        }
    }
    return res.json({
        status:"success",
        data:comm
    })
})
exports.del = async(function *(req, res){
    let id = req.params.id
    comment.del(id)
    .then(e=>{
        console.log(e)
        res.json({
            status:"success",
            data:e
        })
    })
})