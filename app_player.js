
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

var routes = require('./routes');
var player = require('./routes/player');

var app = express();

// all environments
app.set('port', process.env.PORT || 50001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(function (err, req, res, next) {
		res.status(500);
		res.render('error', {error:err});
	});
}

app.get('/', routes.index);
app.use('/player', player);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
