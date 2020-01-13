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


var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', function(req, res, next) {
    console.log(req.body);
    // const token = crypto.pbkdf2Sync(req)
},
signUpRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);


module.exports = app;
