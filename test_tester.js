'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'name' : 'test_tester',
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/tester',
		'app_path' : './azbnapps',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

azbn.load('tester', require(cfg.path.azbnode + '/mdl/tester'));
azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */

setInterval(function(){
	azbn.mdl('tester').doTestStrict(require(cfg.path.app + '/default')(azbn));
}, 2500);

azbn.event('eval_script', azbn);