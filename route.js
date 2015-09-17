var bodyParser = require('body-parser');
//var User = require('./db/user.js');
module.exports = function (app, db, log) {
	//var userAuth = new User(db, log);

	app.use(bodyParser.urlencoded({ extended: true }));
	//app.use(userAuth.isLoggedIn)

	app.get('/', function (req, res) {
		//if (user.logged_in) {
		//	res.sendFile(__dirname + '/public/index.html');
		//} else {
			res.sendFile(__dirname + '/public/login.html');
		//}
	});

	app.get('/assets/:type/:file', function (req, res) {
		var type = req.params.type;
		var file = req.params.file;

		res.sendFile(__dirname + '/public/assets/' + type + "/" + file);
	});

	app.post('/do/login', function (req, res) {
		res.redirect('/');
	});

}