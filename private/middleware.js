module.exports = function Middleware(main) {
	var sess = main.sess;
	var log = main.log;

	this.isLoggedIn = function (req, res, next) {
		var sess_id = req.cookies.session;

		req.session = sess.get(sess_id);

		if (req.session === void 0) {
			if (req.path === '/login' || 
				req.path.split('/')[1] === 'assets' ||
				req.path === '/do/login') {
				return next();
			}
			log('Redirecting to login..');
			res.redirect('/login');
			return;
		}
		next();
	}
}