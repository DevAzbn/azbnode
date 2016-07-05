/*
обработчики запроса к серверу
*/

module.exports = {
	
	default : function($) {
		//var str = 'test run!';
		//$.azbn.echo(str);
		//$.res.end(str);
		
		var postData = '';
		
		$.req.on('data', function(chunk){
			postData += chunk;
		});
		$.req.on('end', function(){
			var name = $.azbn.mdl('querystring').parse(postData).name;
			
			var file = $.azbn.mdl('pagebuilder').cfg.path.html_root + '/fecss/savehtml/' + name + '.html';
			
			/*
			$.azbn.mdl('fs').exists(file, function (exists) {
				$.azbn.echo('123');
				if(exists) {
					var file_h = new $.azbn.mdl('fs').ReadStream(file);
					file_h.pipe(res);
				} else {
					$.res.end('autosave not found');
				}
				
			});
			*/
			
			//$.res.end('');
		});
		
	},
	
};