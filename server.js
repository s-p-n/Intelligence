var express = require('express');
var app = express();
var debugging = false;

function log () {
	if (!debugging) {
		return;
	}

	console.log.apply(this, arguments);
}

var user = {
	logged_in: false
};

app.get('/', function (req, res) {
	if (user.logged_in) {
		console.log("Strange..");
	} else {
		res.sendFile(__dirname + '/public/login.html')
	}
});

app.get('/assets/:type/:file', function (req, res) {
	var type = req.params.type;
	var file = req.params.file;
	log("Type:", type);
	log("File:", file);
	res.sendFile(__dirname + '/public/assets/' + type + "/" + file);
});

log("Server Running.");

app.listen(8000);
