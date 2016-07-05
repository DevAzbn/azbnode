'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'name' : 'create_app',
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/create_app',
		'app_path' : './azbnapps',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

//azbn.load('fs', require('fs'));
var ncp = require('ncp').ncp;
azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */

var name = azbn.getArgv('name');
var d_source = cfg.path.app_path + '/default';
var d_destination = cfg.path.app_path + '/' + name;
var f_source = './default.js';
var f_destination = name + '.js';
var f2_source = './default.cmd';
var f2_destination = name + '.cmd';

azbn.regEvent('onDirCreated', cfg.name, function(prm){
	azbn.echo(prm.name + ' was created');
});

azbn.regEvent('onFileCreated', cfg.name, function(prm){
	azbn.echo(prm.name + ' was created');
});


ncp(d_source, d_destination, function (err) {
	/*
	if (err) {
		return console.error(err);
	}
	*/
    azbn.event('onDirCreated', {name : d_destination});
});
ncp(f_source, name + '.js', function (err) {
    azbn.event('onFileCreated', {name : f_destination});
});
ncp(f2_source, name + '.cmd', function (err) {
    azbn.event('onFileCreated', {name : f2_destination});
});

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);