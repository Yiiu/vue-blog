const article = require("../db/controllers/article");
const user = require("../db/controllers/users");
module.exports = (app) => {
	// 全部文章
    app.post("/index", article.index)
    // 文章详情
    app.post("/article", article.edit)
    app.post("/login", user.login)
    app.post("/checklogin", user.checkLogin)
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
    app.post("/admin/add", routers.admin.articleAdd)
    app.post("/admin",routers.admin.index)
    app.post("/admin/id", routers.admin.edit)
    app.post("/admin/update", routers.admin.update)
    app.post("/admin/del", routers.admin.del)
    app.post("/admin/addtype", routers.admin.addtype)

    app.post("/types", routers.admin.types)
    app.post("/tags", routers.admin.tags)
    */
}
