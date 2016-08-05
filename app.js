var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var router = require("./m/router");
var session = require('express-session');


app.use(session({
    secret: '12345',
    name: 'logss',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: 'test', 
    resave: false,
    saveUninitialized: true,
    maxAge: 1000000*60*60 // default session expiration is set to 1 hour
}));

app.all("*", function (req, res, next) {
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(cookieParser());


router(app);

app.listen(3000, function(){
	console.log("good");
});