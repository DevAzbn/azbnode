/*
обработчики запроса к серверу
*/

module.exports = {
	
	default : function($) {
		var str = 'test run!';
		$.azbn.echo(str);
		$.res.end(str);
	},
	
	test2 : {
		
		default : function($) {
			var str = 'test2 run!';
			$.azbn.echo(str);
			$.res.end(str);
		},
		
		test3 : {
			
			default : function($) {
				var str = 'test3 run!';
				$.azbn.echo(str);
				$.res.end(str);
			},
			
		}
		
	},
	
};