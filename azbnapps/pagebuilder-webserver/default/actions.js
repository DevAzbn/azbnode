/*
обработчики запроса к серверу
*/

var actions = {
	
	'test' : require('./actions/test'),
	'error' : require('./actions/error'),
	'pagebuilder' : require('./actions/pagebuilder'),
	'savehtml' : require('./actions/savehtml'),
	'catalog' : require('./actions/catalog'),
	
};

module.exports = actions;