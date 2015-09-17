var bcrypt = require('bcrypt-nodejs');
var sessions = {};
module.exports = function (log) {
	this.create = function (user) {
		var salt = bcrypt.genSaltSync();
		var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
		var id = bcrypt.hashSync(current_date+random, salt);
		sessions[id] = user;
		return id;
	};
	this.get = function (id) {
		return sessions[id];
	};
	this.destroy = function (id) {
		delete sessions[id];
	};
};