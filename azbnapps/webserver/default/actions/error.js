/*
обработчики запроса к серверу
*/

module.exports = {
		
	default : function($) {
		var str = 'error in addr!';
		$.azbn.echo(str);
		$.res.end(str);
	},
	
};