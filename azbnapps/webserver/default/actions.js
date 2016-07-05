/*
обработчики запроса к серверу
*/

var actions = {
	
	test : require('./actions/test'),
	error : require('./actions/error'),
	
};

module.exports = actions;