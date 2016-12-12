"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require("./public/router");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require("./settings");
var path = require('path')

// 日志
const winston = require('winston');
const expressWinston = require('express-winston');

app.use(session({
    secret: 'wanan',
    name: 'wanan',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        url: "mongodb://"+config.host+":"+config.port+"/"+config.db,
    })
}));


// 日志
/*app.all("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});*/

app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    /*new winston.transports.File({
      filename: 'logs/success.log'
    })*/
  ]
}));

app.use(require('express-promise')());
app.use(morgan('dev'));
app.use(bodyParser.json());

router(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
});