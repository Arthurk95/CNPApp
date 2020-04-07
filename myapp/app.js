if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var logger = require('morgan');
var sql = require('mysql');
var fs = require('fs'), configPath = './config.json';//credentials file
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
con = sql.createPool({connectionLimit : 100,"host":parsed.host,"user":parsed.user,"password":parsed.password,"database":parsed.database});
weatherdata = "http://api.openweathermap.org/data/2.5/weather?id=" + parsed.sacramentoid + "&appid=" + parsed.weatherkey;
const initializePassport = require('./passport-config');
// const auth = require('./public/javascripts/loginScripts')
initializePassport(passport, con);
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var trackerRouter = require('./routes/tracker');
var adminRouter = require('./routes/admin');
var reportsRouter = require('./routes/reports');
var emailerRouter = require('./routes/emailer');
var tasksRouter = require('./routes/tasks');
var statsRouter = require('./routes/stats');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
// app.use(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/tracker', trackerRouter);
app.use('/admin', adminRouter);
app.use('/reports', reportsRouter);
app.use('/emailer', emailerRouter);
app.use('/tasks', tasksRouter);
app.use('/stats', statsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});

module.exports = app;
