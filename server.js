var express = require('express');
var app = express();

var user = {
	logged_in: false
};

app.get('/', function (req, res) {
	if (user.logged_in) {
		console.log("Strange..");
	} else {
		res.sendFile('./public/login.html')
	}
});

app.get('/assets/:type/:file', function (req, res) {
	var type = req.params.type;
	var file = req.params.file;
	res.sendFile('./public/' + type + "/" + file);
});

app.listen(8000);
