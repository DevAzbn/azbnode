'use strict';
/*
Примерный файл
*/
var Antigate = require('antigate');
var ag = new Antigate('53a70213bff2f4ed174c5f29d2b52df9');
ag.processFromURL('https://api.vk.com/captcha.php?sid=410884808014&s=1', function(error, text, id) {
	if (error) {
		throw error;
	} else {
		console.log(text);
	}
});
