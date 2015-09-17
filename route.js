var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Middleware = require('./private/middleware.js');
var Post = require('./private/post.js');
var Session = require ('./private/session.js');
var User = require('./private/db/user.js');
var bcrypt = require('bcrypt-nodejs');
var valientScanner = require('./private/scan/valiant.js');
module.exports = function (main) {
	// Start the scan process!
	valientScanner(main);

	main.bcrypt = bcrypt;

	var sess = new Session(main);
	main.sess = sess;

	var userAuth = new User(main);
	main.userAuth = userAuth;

	var mid = new Middleware(main);
	var post = new Post(main);

	var app = main.app;
	var log = main.log;

	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(mid.isLoggedIn);
	app.post('/do/login', post.doLogin);

	app.get('/', function (req, res) {
		log("\nSending index.html");
		res.sendFile(__dirname + '/public/index.html');
	})

	app.get('/login', function (req, res) {
		log("\nSending login.html");
		res.sendFile(__dirname + '/public/login.html');
	});

	app.get('/assets/:type/:file', function (req, res) {
		var type = req.params.type;
		var file = req.params.file;

		//log("Sending Asset:", type + "/" + file);

		res.sendFile(__dirname + '/public/assets/' + type + "/" + file);
	});


}