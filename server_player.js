var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var songdo = require('./routes/songdo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/songdo', songdo);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status||500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status||500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/', function(req, res){
    console.log('Hello');
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello');
});


app.listen(50000, function(){
    console.log('Server listening on Port 50000');
});


module.exports = app;