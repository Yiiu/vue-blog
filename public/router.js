"use strict";
const article = require("../db/controllers/article");
const user = require("../db/controllers/users");
const type = require("../db/controllers/type");
const comment = require("../db/controllers/comment");
const nav = require("../db/controllers/nav");

module.exports = (app) => {
    // user 
    app.post("/api/login", user.login)
    app.post("/api/logon", user.logon)
    app.post("/api/checklogin", user.checkLogin)
    app.post("/api/logout", user.logout)
	// 文章首页
    app.get("/api/article", article.index)
    app.get("/api/article/:id", article.article)
    
    app.post("/api/article", user.requiresLogin, article.add)
    app.delete("/api/article/:id", user.requiresLogin, article.del)
    app.post("/api/admin/update", user.requiresLogin, article.update)
    // type
    // 添加type
    app.post("/api/type", user.requiresLogin, type.add)
    // 获取type
    app.get("/api/type", type.finds)
    app.get("/api/type/:alias", type.one)
    app.delete("/api/type/:id", user.requiresLogin, type.del)
    app.post("/api/type/del/:id", user.requiresLogin, type.del)
    // comment
    app.post("/api/comment", comment.add)
    app.get("/api/comment", comment.findAll)
    app.get("/api/comment/:id", comment.finds)
    app.get("/api/comment/child/:id", comment.findChilds)
    app.delete("/api/comment/:id", user.requiresLogin, comment.del)
    // nav
    app.get("/api/nav/list", nav.navList)
    app.post("/api/nav/list", user.requiresLogin, nav.addFindNav)
    app.post("/api/nav/list/up", user.requiresLogin, nav.upNav)
}
