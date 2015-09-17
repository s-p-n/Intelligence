var req = require('request');
var cheerio = require('cheerio');
var url = 'http://www.aberoth.com/highscore/Most_Valiant_Steam.html';
var numMinutes = 10;
var refreshTime = 1000 * 60 * numMinutes; // 2 minutes

module.exports = function (main) {
	var db = main.db;
	var players = db.collection('players');
	var lastFetch = {};
	function reload () {
		req.get(url, function (err, res, body) {
			var $ = cheerio.load(body);
			var time = new Date().getTime();
			$('tr').each(function (item) {
				var rank = $(this).children('td:nth-child(1)').text().trim();
				var name = $(this).children('td:nth-child(2)').text().trim();
				var killed = $(this).children('td:nth-child(3)').text().trim();
				var timeRange = false;
				if (lastFetch[name] === void 0) {
					lastFetch[name] = {
						killed: killed, 
						timeStart: time,
						online: false
					};
				} else if (lastFetch[name].killed !== killed) {
					if (lastFetch[name].online) {
						lastFetch[name].killed = killed;
					} else {
						lastFetch[name].killed = killed;
						lastFetch[name].timeStart = time;
						lastFetch[name].online = true;
					}
					
				} else {
					if (lastFetch[name].online) {
						timeRange = [lastFetch[name].timeStart, time];
						lastFetch[name].online = false;
					} else {
						return;
					}
				}
				savePlayer(name, killed, rank, timeRange);
			});
		});
	}
		
	
	function savePlayer (name, killed, rank, timeRange) {
		var updateObj = {'$set': {
			_id: name,
			valiant: {killed: killed, rank: rank}
		}};
		if (timeRange) {
			updateObj['$push'] = {timeRange: timeRange};
		}
		players.update(
			{_id: name}, 
			updateObj, 
			{'upsert': true}
		);
	}

	setInterval(reload, refreshTime);
}
