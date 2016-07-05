'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	path : {
		azbnode : './azbnode',
		app : './azbnapps/webserver',
		config : '/default',
		root : '/default/files',
	},
	port : 5891,
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

//azbn.load('fs', require('fs'));

//var cluster = require('cluster');
azbn.load('cluster', require('cluster'));
var numCPUs = require('os').cpus().length;

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

if (azbn.mdl('cluster').isMaster) {
	
	for (var i = 0; i < numCPUs; i++) {
		azbn.mdl('cluster').fork();
	}
	
	azbn.mdl('cluster').on('exit', function(worker, code, signal) {
		azbn.echo('worker ' + worker.process.pid + ' died', 'AzbNodeCluster');
	});
	
} else {
	
	azbn.load('webserver', new server(azbn, config, actions));
	
}

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);