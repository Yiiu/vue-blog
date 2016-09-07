"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require("./m/router");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const data = require("./settings");


app.use(session({
    secret: '12345',
    name: 'logss',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
        url: "mongodb://"+data.host+":"+data.port+"/"+data.db,
    })
}));


app.all("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(require('express-promise')());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

router(app);

app.listen(8080, function(){
    console.log('App (dev) is now running on port 3000!');
});