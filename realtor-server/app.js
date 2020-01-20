var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const crypto = require('crypto');

var indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var apartmentsRouter = require('./routes/apartments');
const countryRouter = require('./routes/countries');
const cityRouter = require('./routes/cities');
const imageRouter = require('./routes/images');


var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', function(req, res, next) {
    console.log(req.body);
    let token = crypto.pbkdf2Sync(req.body.password, 'realtorproject', 10000, 64, 'sha512');
    req.body.password = token.toString('base64');
    next();
},
signUpRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/countries', countryRouter);
app.use('/cities', cityRouter);
app.use('/images', imageRouter);


module.exports = app;
