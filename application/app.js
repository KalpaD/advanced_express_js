var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Plugin nconf to the application.
var nconf = require('nconf');
// Add the loggin framework winston 
var winston = require('winston');
// Adding nunjucks as the tempalte engine
var nunjucks = require('nunjucks');
// Getting instagram api libs
var ig = require('instagram-node').instagram();

// Configuring the file logger
winston.add(winston.transports.File, { 'filename': 'application.log', 'level': 'silly'});

var index = require('./routes/index');
var users = require('./routes/users');
var self = require('./routes/self');
var igoauth = require('./controllers/igController');

var app = express();

// Configure nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app // passing the app instance to nunjucks
});

// setting the configuration file to fetch properties.
// this demo how to use nconf to externalize the properties.
nconf.file('./config/config.json');
winston.info('nconf initialization successful.');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Chnage the view engine to html
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/self', self);
app.use('/igoauth', igoauth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
