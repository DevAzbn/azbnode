/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/test0002',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);

azbn.load('fs', require('fs'));
azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);


/* --------- Код здесь --------- */

azbn.regEvent('onLoadFile', 't1', function(prm){
	azbn.echo(prm.text);
	
	azbn.mdl('fs').open(cfg.path.app + '/log.txt', 'a+', 0644, function(err, file_handle) {
		azbn.mdl('fs').write(file_handle, azbn.now() + ': ' + prm.text + '\n', null, 'utf8', function(err, written) {
			if (!err) {
				azbn.mdl('fs').close(file_handle);
				prm.written = written;
				azbn.event('onWriteFile', prm);
			} else {
				
			}
		});
	});
});

azbn.regEvent('onWriteFile', 't1', function(prm){
	azbn.echo('Записано: ' + prm.written + ' байт: ' + prm.text);
});

if(azbn.is_def(azbn.getArgv('text'))) {
	azbn.event('onLoadFile', {text : azbn.getArgv('text')});
}

azbn.mdl('fs').open(cfg.path.app + '/test.txt', 'r', 0644, function(err, file_handle) {
	if (!err) {
		azbn.mdl('fs').read(file_handle, 10240, null, 'utf8', function(err, data) {
			if (!err) {
				// Всё прошло хорошо
				azbn.event('onLoadFile', {text : data});
				azbn.mdl('fs').close(file_handle);
			} else {
				// Произошла ошибка при чтении
			}
		});
	} else {
		// Обработка ошибок
	}
});

/* --------- /Код здесь --------- */


azbn.event('eval_script', azbn);