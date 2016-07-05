/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/pagebuilder',
		'app-server' : './azbnapps/pagebuilder-webserver',
	},
	'ext' : '/.html',
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));

azbn.load('pagebuilderparser', require(cfg.path.azbnode + '/mdl/pagebuilderparser'));
azbn.mdl('pagebuilderparser').setCfg(azbn, cfg);

var ncp = require('ncp').ncp;

azbn.event('loaded_azbnode', azbn);

azbn.load('fs', require('fs'));
azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */

var root, build, build_less, build_js, project;

if(azbn.is_def(azbn.getArgv('root'))) {
	root = ('root/' + azbn.getArgv('root'));
} else {
	root = 'root/index';
}


if(azbn.is_def(azbn.getArgv('build'))) {
	build = ('build/' + azbn.getArgv('build'));
} else {
	build = 'build/index';
}


if(azbn.is_def(azbn.getArgv('project'))) {
	project = azbn.getArgv('project');
} else {
	project = 'default';
}


build_less = azbn.mdl('pagebuilderparser').getLESSFileName(build);
build_js = azbn.mdl('pagebuilderparser').getJSFileName(build);
build = azbn.mdl('pagebuilderparser').getFileName(build);


var code = azbn.mdl('pagebuilderparser').getSnippetCode(root);

azbn.mdl('fs').exists(build, function (exists) {
	if(exists) {
		azbn.mdl('fs').unlinkSync(build);
	} else {
		
	}
	azbn.mdl('fs').open(build, 'w+', 0644, function(err, file_handle) {
		azbn.mdl('fs').write(file_handle, code.html, null, 'utf8', function(err, written) {
			if (!err) {
				azbn.mdl('fs').close(file_handle);
				
				ncp(build, cfg.path['app-server'] + '/default/files/' + project + '/' + azbn.getArgv('build') + '.html', function (cerr) {
					if (!cerr) {
						azbn.echo('HTML copied to webserver');
					}
				});
				
				
				azbn.mdl('fs').exists(build_less, function (exists) {
					if(exists) {
						azbn.mdl('fs').unlinkSync(build_less);
					} else {
						
					}
					
					var str = '';
					for(var i=0; i < azbn.mdl('pagebuilderparser').code.less.length; i++) {
						str = str + "\n" + azbn.mdl('pagebuilderparser').code.less[i];
					}
					
					azbn.mdl('fs').open(build_less, 'w+', 0644, function(err, _file_handle) {
						azbn.mdl('fs').write(_file_handle, str, null, 'utf8', function(err, written) {
							if (!err) {
								azbn.mdl('fs').close(_file_handle);
								
								ncp(build_less, cfg.path['app-server'] + '/default/files/' + project + '/css/site/' + azbn.getArgv('build') + '.less', function (cerr) {
									if (!cerr) {
										azbn.echo('LESS copied to webserver');
									}
								});
							} else {
								
							}
						});
					});
				});
				
				
				azbn.mdl('fs').exists(build_js, function (exists) {
					if(exists) {
						azbn.mdl('fs').unlinkSync(build_js);
					} else {
						
					}
					
					var str = '';
					for(var i=0; i < azbn.mdl('pagebuilderparser').code.js.length; i++) {
						str = str + "\n" + azbn.mdl('pagebuilderparser').code.js[i];
					}
					
					azbn.mdl('fs').open(build_js, 'w+', 0644, function(err, _file_handle) {
						azbn.mdl('fs').write(_file_handle, str, null, 'utf8', function(err, written) {
							if (!err) {
								azbn.mdl('fs').close(_file_handle);
								
								ncp(build_js, cfg.path['app-server'] + '/default/files/' + project + '/js/' + azbn.getArgv('build') + '.js', function (cerr) {
									if (!cerr) {
										azbn.echo('JS copied to webserver');
									}
								});
							} else {
								
							}
						});
					});
				});
				
				
			} else {
				
			}
		});
	});
});

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);