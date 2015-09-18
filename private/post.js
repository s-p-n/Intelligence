var prettyDate = require('pretty-date');
module.exports = function Post (main) {
	var userAuth = main.userAuth;
	var players = main.players;
	var sess = main.sess;
	var log = main.log;

	this.doLogin = function (req, res) {
		userAuth.validateLogin(req.body.username, req.body.password, function (err, result) {
			if (err) {
				log(err);
			} else {
				var id = sess.create(res);
				res.cookie("session", id);
				log(result);
			}
			res.redirect('/');
		});
	};

	this.doRegister = function (req, res) {
		userAuth.addUser(req.body.username, req.body.password, function (err, result) {
			if (err) {
				log(err);
			} else {
				log(result);
			}
			res.redirect('/');
		});
	};

	this.findPlayer = function (req, res) {
		var player = req.body.player.toLowerCase();
		player = player[0].toUpperCase() + player.substr(1);
		log("Finding Player:", player);
		players.getPlayer(player, function (err, result) {
			if (err) throw err;
			console.log(result);
			if (result.timeRange) {
				var i;
				for (i = 0; i < result.timeRange.length; i += 1) {
					result.timeRange[i][0] = prettyDate.format(new Date(result.timeRange[i][0]));
					result.timeRange[i][1] = prettyDate.format(new Date(result.timeRange[i][1]));
				}
			}
			req.session.queryResult = result;
			res.redirect('/');
		});
	}
};

function correctTimezone (userOffset, time) {
	var serverOffset = new Date().getTimezoneOffset();
	console.log(userOffset, serverOffset);
	return time;
}