let users = require("../db/users");
let article = require("../db/article");

module.exports = (app) => {
	//路由模块
	const routers = {
		admin: require("./router/admin"),
		log: require("./router/login"),
		index: require("./router/index")
	};
    // 登录
    app.post("/login",routers.log.login)
    app.post("/logon", routers.log.logon)
    // 登陆状态检测
    app.post("/log",routers.log.state)


    app.post("/querys",routers.index.search)
    // 首页
    app.post("/index", routers.index.index)
    // 文章详情页
    app.post("/article", routers.index.article)


    // admin添加文章
    app.post("/admin/add", routers.admin.articleAdd)
    app.post("/admin",routers.admin.index)
    app.post("/admin/id", routers.admin.edit)
    app.post("/admin/update", routers.admin.update)
    app.post("/admin/del", routers.admin.del)
}
