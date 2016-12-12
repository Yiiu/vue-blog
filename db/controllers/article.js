"use strict";
const article = require("../models/article")


const type = require("../controllers/type");
const users = require("../controllers/users");
const tag = require("../controllers/tag");

const md = require("../../public/markdown");
const {trimsHTML} = require("../../public/uitl");

var {isEmail, isEmpty, isLength} = require('validator');

const { wrap: async } = require('co');
const thunkify = require('thunkify-wrap');
const moment = require('moment')
moment.locale('zh-cn');

/**
 * 文章首页
 * @param {Number} page     页数
 * @param {Number} limit    每一页的数量
 */
exports.index = async(function *(req, res){
    const page = req.query.page
    let limit = 0;

    if(req.query.type == "length"){
        article.num().then(data=>{
            return res.json({
                status:"success",
                data:data
            })
        })
    }else {
        req.query.limit ? limit = req.query.limit : limit = 10

        yield article.all(page, limit)
        .then(articles=>{
            for (let article of articles) {

                article.content = trimsHTML(md.render(article.content), 100)

                article.time = [moment(article.update_time).format('lll'), moment(article.update_time).fromNow()]

            }
            return res.json({
                status:"success",
                data:articles
            })
        })
        .catch(err=>{
            return res.json({
                status:"fail",
                msg:"加载失败"
            })
        })
    }

})
/**
 * 单个文章
 * @param {params} req.params.id    文章id
 */
exports.article = async(function *(req, res){
    const id = req.params.id
    yield article.one(id)
    .then(data=>{
        article.update({"_id":data._id},{$inc:{"vistits":1}},()=>{})

        data.time = [moment(data.update_time).format('lll'), moment(data.update_time).fromNow()]
        
        if(req.query.md !== "no"){
            data.content = md.render(data.content)
        }
        return res.json({
            status:"success",
            data:data
        })
    })
    .catch(err=>{
        return res.json({
            status:"fail",
            msg:"没有此文章"
        })
    })

})
/**
 * 添加文章
 *
 * 先添加文章内容
 * 然后添加分类
 * 然后添加标签
 */
/**
 * 添加文章
 * @param {body}  data 文章内容
 */
exports.add = async(function *(req, res){
    let tags = req.body.tags;
    let tagId = [];

    let articles = {
        title: req.body.title,
        author: req.session._id,
        enabled: true,
        cover: req.body.cover,
        content: req.body.content,
    }

    if(isEmpty(articles.title)){
        return res.json({
            status:"fail",
            msg:"请输入内容"
        }) 
    }

    if(isEmpty(articles.content)){
        return res.json({
            status:"fail",
            msg:"请输入内容"
        }) 
    }

    if(req.body.type != ""){
        articles.type = req.body.type
    }

    // 处理tag
    article.add(articles)
    .then(artInfo=>{
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

        res.json({
            status:"success",
            msg:"发布成功"
        })
    })
    .catch(err=>{
        res.json({
            status:"fail",
            msg:"发布失败"
        })
    })


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
        let dels = yield article.del(id)
        res.json({
            status:"success",
            msg:"删除成功"
        })
    }else {
        if(data.type != null){
            type.delArt(data.type, data._id, (err, data)=>{
                if(err){
                    res.json({
                        status:"fail",
                        msg:"删除失败"
                    })
                }
            })
        }
        if(data.tags != null){
            yield data.tags.map((i)=>{
                tag.del(i, data._id)
                .then((t)=>{
                    return t
                })
            })
        }
        yield article.del(id)
        res.json({
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
    if(isEmpty(news.title)){
        return res.json({
            status:"fail",
            msg:"请输入内容"
        }) 
    }
    
    if(isEmpty(news.content)){
        return res.json({
            status:"fail",
            msg:"请输入内容"
        }) 
    }

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
    if(data.tags) {
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
                let a = tag.link(i, data._id)
                .then((result)=>{
                    a = result;
                })
                return a;
            }else {
                for(let j of data.tags){
                    if(i == j.name){
                        return j._id;
                    }else {
                        let a = tag.link(i, data._id)
                        .then((result)=>{
                            return result;
                        })
                        return a;
                    }
                }
            }
        })
    }
    // 更新article
    article.update({"_id":data._id},news, (err, data)=>{
        if(err){
            res.json({
                status:"fail"
            })
        }else {
            res.json({
                status:"success"
            })
        }
    })
})
