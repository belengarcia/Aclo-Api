require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const destinyRouter = require('./routes/destiny');
const sessionRouter = require('./routes/sessions');


require('./configs/db.configs');
require('./configs/passport.config').setup(passport);
const corsConfig = require('./configs/cors.config');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsConfig));
app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);
app.use('/destiny', destinyRouter);

app.use(function(req, res, next) {
  next(createError(404));
});



// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   const data = {}
//   data.message = err.message;
//   res.json(data)
// });


app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);

  const data = {}

  if(err instanceof mongoose.Error.ValidationError){
    res.status(400);
    for(field of Object.keys(err.errors)) {
      err.errors[field] = err.errors[field].message
    }
    data.errors = err.errors
  } else if (err instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.err = req.app.get('env') === 'development' ? err : {};

  data.message = err.message;
  res.json(data)
});


module.exports = app;
