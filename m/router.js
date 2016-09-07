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
}
