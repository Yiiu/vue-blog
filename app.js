let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let router = require("./m/router");
let session = require('express-session');


app.use(session({
    secret: '12345',
    name: 'logss',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000000*60*60 // default session expiration is set to 1 hour
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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));


router(app);

app.listen(3000, function(){
	console.log("good");
});
