'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/vktest',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
//azbn.event('loaded_azbnode', azbn);

//azbn.load('exec', require('child_process').exec);
var exec = require('child_process').exec;

azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
//azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */

var child = exec('ls -la', {}, function(err, stdout, stderr){
	azbn.echo(stdout);
});

azbn.event('eval_script', azbn);