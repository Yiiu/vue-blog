"use strict";
const article = require("../db/controllers/article");
const user = require("../db/controllers/users");
const type = require("../db/controllers/type");
module.exports = (app) => {
    // user 
    app.post("/login", user.login)
    app.post("/logon", user.logon)
    app.post("/checklogin", user.checkLogin)

	// 文章
    app.get("/index", article.index)
    app.post("/article", article.edit)
    app.post("/admin/add", user.requiresLogin, article.add)
    app.delete("/del/article/:id", user.requiresLogin, article.del)
    app.post("/admin/update", user.requiresLogin, article.update)

    // type
    app.post("/admin/addtype", user.requiresLogin, type.add)
    app.get("/types", type.finds)
    /*
	const routers = {
		admin: require("./router/admin"),
		log: require("./router/login"),
		index: require("./router/index")
	};
    // 登录
    app.post("/logon", routers.log.logon)
    // 登陆状态检测
    app.post("/log",routers.log.state)


    app.post("/querys",routers.index.search)
    // 首页
    // 文章详情页
    app.post("/article", routers.index.article)


    // admin添加文章
    app.post("/admion/add", routers.admin.articleAdd)
    app.post("/admin",routers.admin.index)
    app.post("/admin/id", routers.admin.edit)
    app.post("/admin/update", routers.admin.update)
    app.post("/admin/del", routers.admin.del)
    app.post("/admin/addtype", ruters.admin.addtype)

    app.post("/types", routers.admin.types)
    app.post("/tags", routers.admin.tags)
    */
}
