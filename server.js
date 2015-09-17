var express = require('express');
var fs = require('fs');
var app = express();
var MongoClient = require('mongodb').MongoClient
var route = require('./route.js');
var args = {};
var debugging = true;
var logFile = './data/nodeLog';
var errFile = './data/nodeErr';
var port = 8000;

(function () {
	var requireVal = false;
	var name = '';
	var argTest = /--[a-zA-Z]+/;
	var numTest = /[0-9]+/;
	var boolReplacer = {
		'0': false,
		'1': true,
		'false': false,
		'true': true,
		'no': false,
		'yes': true,
		'off': false,
		'on': true
	}
	process.argv.forEach(function (val, index, array) {
		var arg, entry;
		if (index < 2) {
			return;
		}
		if (requireVal) {
			requireVal = false;
			if (val in boolReplacer) {
				val = boolReplacer[val];
			}
			if (numTest.test(val)) {
				val = parseInt(val);
			}
			args[name] = val;
		}
		if (argTest.test(val)) {
			requireVal = true;
			name = val.split('--')[1];
		}
	});
}());
if (args.debug === false) {
	debugging = false;
}
if (args.port) {
	port = args.port;
}
function log () {
	var i, data = '';
	for (i in arguments) {
		if (typeof arguments[i] !== 'string') {
			arguments[i] = JSON.stringify(arguments[i]);
		}
		data += arguments[i] + ' ';
	}
	if (!debugging) {
		fs.appendFileSync(logFile, data + '\n');
		return;
	}

	console.log(data);
}

MongoClient.connect('mongodb://158.69.202.1:27017/intel', function(err, db) {

	if(err) throw err;

	route(app, db, log);

	app.listen(port);
	log("\nServer Running on port", port);
});


/** Handle exits: **/

process.stdin.resume();

function exitHandler (arg) {
	log("Shutting down..", arg);
	// some other closing procedures go here
	process.exit( );
}

function errorHandler (err) {
	fs.appendFileSync(errFile, JSON.stringify(err));
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
//process.on('SIGKILL', exitHandler);
process.on('uncaughtException', errorHandler);
