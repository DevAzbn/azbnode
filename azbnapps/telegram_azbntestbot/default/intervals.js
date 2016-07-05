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
	
	/*
	this.add('addvkfr_check', 30000, function(){
		require('./require/addvkfr_check')(azbn);
	});
	
	this.add('addvkfr_check', 30 * 60000, function(){
		require('./require/userinfo_check')(azbn);
	});
	
	require('./require/invite2gr_load')(azbn);
	this.add('invite2gr_load', 86400000 / 4, function(){
		require('./require/invite2gr_load')(azbn);
	});
	
	this.add('invite2gr_send', 30000, function(){
		require('./require/invite2gr_send')(azbn);
	});
	
	this.add('telegrambot_notify', 30000, function(){
		require('./require/telegrambot_notify')(azbn);
	});
	*/
	/*
	this.add('default', 400, function(){
		//azbn.echo('default interval', log_name);
		require('./require/default')(azbn);
	});
	*/
	
	/*
	azbn.regEvent('loaded_azbnode', 'azbnodeevents', function(prm){
		azbn.echo('loaded_azbnode', log_name);
	});
	*/
}

module.exports = intervals;