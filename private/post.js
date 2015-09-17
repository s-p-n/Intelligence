module.exports = function Post (main) {
	var userAuth = main.userAuth;
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
	}
};