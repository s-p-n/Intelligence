var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
var route = require('./route.js');

var debugging = true;

function log () {
	if (!debugging) {
		return;
	}

	console.log.apply(this, arguments);
}

MongoClient.connect('mongodb://127.0.0.1:27017/intel', function(err, db) {

	if(err) throw err;

	route(app, db, log);
	log("Server Running.");

	app.listen(8000);
});
