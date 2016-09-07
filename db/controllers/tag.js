"use strict";
const mongoose = require("mongoose");
const tag = require("../models/tag");
const { wrap: async } = require('co');
const co = require('co');
const thunkify = require('thunkify-wrap');

// 查询一个tag
exports.link = async(function* (tagName, art){
    let result = yield thunkify(tag.findName)(tagName);
    if(result == null || result == "null") {
        let tagInfo = yield thunkify(tag.add)(tagName);
        yield thunkify(tag.addArticle)(tagInfo._id, art)
        return yield Promise.resolve(tagInfo._id)
    } else {
        yield thunkify(tag.addArticle)(result._id, art)
        return yield Promise.resolve(result._id);
    }
})
exports.del = async(function* (tagId, art){
    tag.delArticle(tagId, art, (err, data)=>{})
    let data = yield thunkify(tag.findId)(tagId);
    if(data.article.length == 0){
        tag.del(tagId, ()=>{})
    }
    return yield Promise.resolve(data)
})