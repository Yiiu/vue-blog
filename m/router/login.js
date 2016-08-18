let users = require("../../db/controllers/users");
let md5 = require("md5");
module.exports = {
    // 登录
    login:function(req, res, next){
        users.finds(req.body.name, function( data ){
            if(data){
                if(data.name == req.body.name && data.password == md5(req.body.password)){
                    req.session.name = req.body.name;
                    req.session.sign = "true";
                    res.jsonp({op:"true"})
                }else if(data.name == req.body.name && data.password == req.body.password){
                    req.session.name = req.body.name;
                    req.session.sign = "true";
                    res.jsonp({op:"true"})
                }else {
                    res.jsonp({op:"false"})
                }
            }else {
                    res.jsonp({op:"false"})
            }
        })
    },
    // 登录检测 成功则返回id
    state:function(req, res, next){
        if(req.session.sign){
            if(req.session.sign == "true"){
                res.jsonp({op:"true",name:req.session.name})
            }else {
                res.jsonp({op:"false"})
            }
        }else {
            res.jsonp({op:"false"})
        }
    },
    logon:function(req, res, next){
        users.add(req.body, function(data){
            res.jsonp({op:"true"})
        })
    }
}
