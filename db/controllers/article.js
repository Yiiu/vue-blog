"use strict";
const article = require("../models/article")


const type = require("../controllers/type");
const users = require("../controllers/users");
const tag = require("../controllers/tag");


const { wrap: async } = require('co');
const thunkify = require('thunkify-wrap');


exports.index = async(function *(req, res){
        const page = req.body.t;
        const limit = 10;
        let data = yield thunkify(article.finds)(page, limit)
        try{
            res.jsonp({
                status:"success",
                data:data
            })
        } catch(err){
            res.jsonp({
                status:"fail",
                msg:"加载失败"
            })
        }
    })
exports.edit = async(function *(req, res){
        const id = req.body.id;
        let data = yield thunkify(article.edit)(id)
        try{
            article.update({"_id":data._id},{$inc:{"vistits":1}},()=>{})
            res.jsonp({
                status:"success",
                data:data
            })
        } catch(err){
            res.jsonp({
                status:"fail",
                msg:"加载失败"
            })
        }
    })
/**
 * 添加文章
 * 
 * 先添加文章内容
 * 然后添加分类
 * 然后添加标签
 */
exports.add = async(function *(req, res){
        let tags = yield req.body.tags;
        let tagId = yield [];
        let articles = yield {
            title: req.body.title,
            author: req.session._id,
            enabled: true,
            content: req.body.content,
        }


        if(req.body.type != ""){
            articles.type = req.body.type
        }


        // 处理tag
        let artInfo =  yield thunkify(article.add)(articles)

        for(let i of tags){
            let m = tag.link(i, artInfo._id);
            m.then((result)=>{
                article.addTag(artInfo._id, result, ()=>{})
            })
        }


        // 处理type
        if(articles.type){
            type.addArt(articles.type, artInfo._id, ()=>{})
        }

        res.jsonp({"1":tagId})

    })
/**
 * 删除文章
 * 
 * 查询文章详情
 * 删除文章
 * 删除type关联
 * 删除tag关联
 * 
 */
exports.del = async(function* (req, res){
    const id = req.params.id;
    let data = yield article
    .findById(id)
    .exec();
    if(data.type == null && data.tags == null) {
        let dels = yield thunkify(article.del)(id)
        res.jsonp({
            status:"success",
            msg:"删除成功"
        })
    }else {
        if(data.type != null){
            type.delArt(data.type, data._id, (err, data)=>{
                if(err){
                    res.jsonp({
                        status:"fail",
                        msg:"删除失败"
                    })
                }
            })
        }
        if(data.tags !=null){
            yield data.tags.map((i)=>{
                let a = tag.del(i, data._id);
                a.then((t)=>{
                    return t
                })
            })
        }
        yield thunkify(article.del)(id)
        res.jsonp({
            status:"success"
        })
    }
})

/**
 * 先更新type
 * 再更新tag
 * 然后更新文章内容
 */
exports.update = async(function* (req, res){
    let news = req.body.data;
    let id = req.body.id;
    let data = yield article
        .findById(id)
        .populate({
            path: "tags",
            select: "name _id"
        })
        .exec();
    // type
    
    if(news.type != null){
        // 假如更改了type，删除旧type关联
        if(news.type != data.type) {
            type.delArt(data.type, data._id, (err, data)=>{
                if(err){
                    res.jsonp({
                        status:"fail"
                    })
                }
            })
            type.addArt(news.type, data._id, (err, data)=>{
                if(err){
                    res.jsonp({
                        staus:"fail"
                    })
                }
            })
        }
    }
    // 删除旧的type关联
    // 用旧的tag匹配新的tag
    //  假如匹配到，返回
    //  假如没匹配到，tagdel
    data.tags.map((i)=>{
        let num = 0;
        for(let j of news.tags){
            if(i.name == j){
                num++;
            } 
        }
        if(num == 0) {
            let a = tag.del(i.id, data._id);
            a.then((result)=>{
                a = result;
            })
            return true;
        }
    })
    // 添加新的type关联
    // 用新的tag匹配旧的tag,
    //  假如匹配到，返回id
    //  假如没匹配到，taglink
    //  都是使用tag名来做判断
    news.tags = yield news.tags.map((i)=>{
        if(data.tags.length == 0){
            let a = tag.link(i, data._id);
            a.then((result)=>{
                a = result;
            })
            return a;
        }else {
            for(let j of data.tags){
                if(i == j.name){
                    return j._id;
                }else {
                    let a = tag.link(i, data._id);
                    a.then((result)=>{
                        return result;
                    })
                    return a;
                }
            }
        }
    })
    // 更新article
    article.update({"_id":data._id},news, (err, data)=>{
        if(err){
            res.jsonp({
                status:"fail"
            })
        }else {
            res.jsonp({
                status:"success"
            })
        }
    })
})