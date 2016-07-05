/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/regexp_replacer',
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

var replacer = function(str, p1, p2, offset, s) {
	return p1+'-'+p2;
}

azbn.mdl('fs').open(cfg.path.app + '/index.html', 'r', 0644, function(err, file_handle) {
	if (!err) {
		azbn.mdl('fs').read(file_handle, 10240, null, 'utf8', function(err, data) {
			azbn.echo(data.replace(new RegExp(/\[snp+\s+tpl="([^"]+)"+\s+class="([^"]+)"+\s+\]/ig), replacer));//[\[snp tpl=\"(\w+)\" class=\"(\w+)\" \]]
		});
	} else {
		// Обработка ошибок
	}
});

/* --------- /Код здесь --------- */


azbn.event('eval_script', azbn);