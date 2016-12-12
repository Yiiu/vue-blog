"use strict";
const nav = require("../models/nav")
const { wrap: async } = require('co');

exports.navList = async(function *(req, res){
    let data = yield nav.findNavList()
    console.log(data)
    res.json({
        status:"success",
        data:data
    })
})
exports.addFindNav = async(function *(req, res){
    let datas = yield nav.findNavList()
    let data = {
        list:req.body.list
    }
    if(datas == null) {
        res.json({
            status:"fail",
            msg: "已存在"
        })
    }
    nav.addFindNav(data)
        res.json({
            status:"success"
        })
})
exports.upNav = async(function *(req, res){
    console.log(req.body)
    nav.update({_id:req.body.id},{list:req.body.data})
    .then(e=>{
        res.json({
            status:"success",
        })
    })
})