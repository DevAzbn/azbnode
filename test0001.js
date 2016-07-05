/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/test0001',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

//azbn.load('fs', require('fs'));
azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);


/* --------- Код здесь --------- */

azbn.regEvent('test', 't1', function(prm){
	azbn.echo('testing');
});
azbn.regEvent('test', 't2', function(prm){
	azbn.echo('testing2');
});
azbn.event('test', {});
azbn.unregEvent('test', 't1');
azbn.event('test', {});
azbn.clearEvent('test');
azbn.event('test', {});


azbn.set('text','123');
azbn.echo(azbn.get('text'));


azbn.load('util', require('util'));
azbn.echo(azbn.mdl('util').format("Test %s", "ahahahahaha"));
azbn.echo(azbn.mdl('util'));
azbn.echo(azbn.unload('util'));

azbn.echo(typeof azbn);
azbn.echo(azbn.getArgv('test'));

/* --------- /Код здесь --------- */


azbn.event('eval_script', azbn);