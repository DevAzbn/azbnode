/*
приложение вконтакте
*/

var intr = {
	
}

function intervals(azbn) {
	this.name = 'BotIntervals';
	var log_name = this.name;
	
	this.add = function(id, time, fnc) {
		intr[id] = setInterval(fnc,time || 1000);
	}
	
	this.clear = function(id) {
		clearInterval(intr[id]);
	}
	
	this.add('invite2gr_load', 86400000, function(){
		require('./require/invite2gr_load')(azbn);
	});
	
	this.add('invite2gr_send', 15000, function(){
		require('./require/invite2gr_send')(azbn);
	});
	
}

module.exports = intervals;