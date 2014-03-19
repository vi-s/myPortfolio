/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , jade = require('jade');

var app = module.exports = express();
var server = require('http').createServer(app);
var portNum = 8080;

server.listen(process.env.PORT || portNum);
console.log("server up on port %d in %s mode", server.address().port, app.settings.env);

/*
1. Tell jade to render stuff ending with .jade.
app.engine('jade', require('jade').__express);

2. To send plain html files
use res.sendfile('[path_to_the_file]profile.html');

3. Tell express to render templates with no extension as jade:
app.set('view engine', 'jade');
*/

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views'); //unnecessary, since this is setting by defualt, but w/e
	//this line allows us to set default engine and do do res.render('index') instead of res.render('index.html') 
	app.set('view engine', 'jade');
	//app.engine('jade', jade.__express);
	app.use(express.bodyParser());
	app.use(express.methodOverride()); //use app.put or app.delete when post contains {_method:put} for ex.
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	console.log('in development');
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*
to run in production do this:
NODE_ENV=production node app.js
*/

app.configure('production', function(){
	console.log('in production!');
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);


