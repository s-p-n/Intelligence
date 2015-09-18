module.exports = function Players (main) {
	"use strict";

	var db = main.db;
	var log = main.log;
	var players = db.collection('players');

	this.getPlayer = function (name, callback) {
		players.findOne({_id: name}, callback);
	};

}