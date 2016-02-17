var express = require('express');
var babelify = require('babelify');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var nunjucks = require('nunjucks');
var config = require('./client/config');
var cors = require('cors');
var request = require('request');


// initialise express
var app = express();
app.use(cors());

app.get('/food',function(req,res){
  request('http://food2fork.com/api/search?key=fd127e184c84280acca4a6c9e47e1248&q', function (error, response, body) {
    if (error) console.log(error);
    else{
      res.send(body);
    }
  });
});

// use nunjucks to process view templates in express
nunjucks.configure('server/templates/views', {
    express: app
});

// less will automatically compile matching requests for .css files
app.use(less('public'));
// public assets are served before any dynamic requests
app.use(express.static('public'));

// common packages are precompiled on server start and cached
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
	cache: true,
	precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
app.use('/js', browserify('./client/scripts', {
	external: config.common.packages,
	transform: [babelify.configure({
		plugins: ['object-assign']
	})]
}));

/*
	set up any additional server routes (api endpoints, static pages, etc.)
	here before the catch-all route for index.html below.
*/

app.get('*', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});

// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
