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
			var value = $.azbn.mdl('querystring').parse(postData).value;
			
			var file = $.azbn.mdl('pagebuilder').cfg.path.html_root + '/__pagebuilder/savehtml/' + name + '.html';
			
			if($.azbn.mdl('fs').existsSync(file)) {
				$.azbn.mdl('fs').unlinkSync(file);
			} else {
				
			}
			
			if(!$.azbn.mdl('fs').existsSync(file)) {
				var file_handle = $.azbn.mdl('fs').openSync(file, 'w+');
				$.azbn.mdl('fs').write(file_handle, value, null, 'utf8', function(err, written) {
					$.azbn.mdl('fs').close(file_handle);
					delete file_handle;
					if (!err) {
						$.res.end('saved');
					} else {
						$.res.end('not saved');
					}
				});
			} else {
				$.res.end('');
			}
		});
		
	},
	
};