"use strict";
var express = require('express');
var oauth = require('./lib/oAuth/oauth');
var port = process.env.PORT || 3000;

var app = express();

// Require Routes js
var routesHome = require('./routes/home');

// Serve static files
app.use(express.static(__dirname + '/public'));

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	oauth.redirectAuthURI(res);
});

app.get('/oauthcallback', function(req, res) {
	oauth.authenticate(req, res, app);
});

// Served Localhost
console.log('Served: http://localhost:' + port);
app.listen(port);