export default (app) => {
    app.map({
        "*":{
            name: "404",
            component:(resolve)=> {
                require(["./view/404"],resolve)
            }
        },
        "/":{
            name: "index",
            component:(resolve)=> {
                require(["./view/index/index"],resolve)
            }
        },
        "/article/:id":{
            name: "article",
            component:(resolve)=> {
                require(["./view/index/article"],resolve)
            }
        },
        "/login":{
            name: "login",
            component:(resolve)=> {
                require(["./view/login"],resolve)
            }
        },
        "/logon":{
            name: "logon",
            component:(resolve)=> {
                require(["./view/logon"],resolve)
            }
        },
        "/update":{
            name: "update",
            component:(resolve)=> {
                require(["./view/update"],resolve)
            }
        },
        "/admin":{
            name: "admin",
            component:(resolve)=> {
                require(["./view/admin/admin"],resolve)
            },
            subRoutes:{
                "/":{
                    name: "admin-index",
                    component:(resolve)=> {
                        require(["./view/admin/index"],resolve)
                    }
                },
                "/:id":{
                    name: "admin-article",
                    component:(resolve)=> {
                        require(["./view/admin/article"],resolve)
                    }
                },
                "/add":{
                    name: "add",
                    component:(resolve)=> {
                        require(["./view/admin/add"],resolve)
                    }
                }
            }
        }
    })
}
