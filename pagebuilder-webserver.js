'use strict';
/*
файл запуска
*/
var cfg = {
	path : {
		azbnode : './azbnode',
		app : './azbnapps/pagebuilder-webserver',
		config : '/default',
		root : '/default/files',
	},
	port : 5891,
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

azbn.load('fs', require('fs'));
azbn.load('querystring', require('querystring'));
azbn.load('path', require('path'));

azbn.load('pagebuilder', require(cfg.path.azbnode + '/mdl/pagebuilderhtmlparser'));
azbn.mdl('pagebuilder').setCfg(azbn, {
	'path' : {
		'azbnode' : './azbnode',
		'html_root' : './azbnapps/pagebuilder-webserver/default/files',
	},
	'ext' : '',
});

azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */

cfg.port = azbn.getArgv('port')||cfg.port;
cfg.path.root = azbn.getArgv('root')||cfg.path.root;

var server = require(cfg.path.azbnode + '/mdl/webserver');
var config = require(cfg.path.app + cfg.path.config + '/config');
var actions = require(cfg.path.app + cfg.path.config + '/actions');

config.port = azbn.getArgv('port')||cfg.port;
config.path = cfg.path;

azbn.load('webserver', new server(azbn, config, actions));

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);