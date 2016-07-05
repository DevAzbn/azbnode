/*
обработчики запроса к серверу
*/

module.exports = {
	
	default : function($) {
		//var str = 'test run!';
		//$.azbn.echo(str);
		//$.res.end(str);
	},
	
	build : {
		
		default : function($) {
			
			// GET
			
			var file = $.urlobj.query.file;
			var siteroot = $.azbn.mdl('path').normalize($.config.path.app + '/' + $.config.path.root + '/');
			
			if($.azbn.mdl('fs').existsSync(siteroot + file)) {
				var resp = $.azbn.mdl('pagebuilder').getSnippetCode(file);
				$.res.end(resp.html);
			} else {
				$.res.end('');
			}
			
		},
	
	},
	
	catalog : {
		
		default : function($) {
			
			var result = {
				'/' : {
					item_list : {
						
					},
					is_file : 0,
					name : '/',
					path : '/',
				},
			};
			
			var readDir = function(base, parent) {
				
				items = $.azbn.mdl('fs').readdirSync($.azbn.mdl('path').normalize($.config.path.app + '/' + $.config.path.root + '/' + base));
				items.forEach(function(item){
					//$.azbn.echo(item);
					
					parent.item_list[item] = {};
					var state = $.azbn.mdl('fs').statSync($.azbn.mdl('path').normalize($.config.path.app + '/' + $.config.path.root + '/' + base + '/' + item));
					
					parent.item_list[item].name = item;
					parent.item_list[item].path = base + '/' +item;
					
					if(state.isDirectory()) {
						parent.item_list[item].is_file = 0;
						parent.item_list[item].item_list = {};
						readDir(base + '/' + item, parent.item_list[item]);
					} else {
						parent.item_list[item].is_file = 1;
					}
					
				});
				
			};
			
			readDir('', result['/']);
			
			$.res.end(JSON.stringify(result));
			
		},
		
	},
	
	'code-editable' : {
		
		default : function($) {
			
		},
		
		save : {
			
			default : function($) {
				
				// POST
				
				var postData = '';
				
				$.req.on('data', function(chunk){
					postData += chunk;
				});
				$.req.on('end', function(){
					var name = $.azbn.mdl('querystring').parse(postData).name;
					var value = $.azbn.mdl('querystring').parse(postData).value;
					
					var file = $.azbn.mdl('path').normalize($.azbn.mdl('pagebuilder').cfg.path.html_root + '/' + name);
					
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
			
		},
		
		open : {
			
			default : function($) {
				
				// GET
				
				var name = $.urlobj.query.name;
				
				var file = $.azbn.mdl('path').normalize($.azbn.mdl('pagebuilder').cfg.path.html_root + '/' + name);
				
				if($.azbn.mdl('fs').existsSync(file)) {
					
					var fs = $.azbn.mdl('fs');
					var fd = new fs.ReadStream(file);
					fd.pipe($.res);
					//$.res.end('123');
					
				} else {
					
					$.res.end('');
					
				}
				
			},
			
		},
		
	},
	
	'block' : {
		
		default : function($) {
			
			$.res.end('block');
			
		},
		
		'build' : {
			
			default : function($) {
				
				var q_file = $.urlobj.query.file;
				var file = q_file + '/.html';
				var siteroot = $.azbn.mdl('path').normalize($.config.path.app + '/' + $.config.path.root + '/');
				
				if($.azbn.mdl('fs').existsSync(siteroot + file)) {
					
					var resp = $.azbn.mdl('pagebuilder').getSnippetCode(file);
					var page = $.azbn.mdl('pagebuilder').getSnippetCode('__pagebuilder/page/block-build.html', resp.html);
					$.res.end(page.html);
					
				} else {
					
					$.res.end('not exists');
					
				}
				
			}
			
		},
		
	},
	
	'savehtml' : {
		
		default : function($) {
			
			// POST
			
			var postData = '';
			
			$.req.on('data', function(chunk){
				postData += chunk;
			});
			$.req.on('end', function(){
				var name = $.azbn.mdl('querystring').parse(postData).name;
				var value = $.azbn.mdl('querystring').parse(postData).value;
				
				var file = $.azbn.mdl('path').normalize($.azbn.mdl('pagebuilder').cfg.path.html_root + '/__pagebuilder/savehtml/' + name + '.html');
				
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
	
	},
	
};