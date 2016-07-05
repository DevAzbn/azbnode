'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/telegram_azbnbot',
		'subapp' : 'default',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);


//парсинг параметров командной строки
azbn.parseArgv();
azbn.event('parsed_argv', azbn);

cfg.path.subapp = azbn.getArgv('root')||cfg.path.subapp;

azbn.load('mysql', require(cfg.path.app + '/' + cfg.path.subapp + '/mysql'));

azbn.event('loaded_mdls', azbn);

/* --------- Код здесь --------- */

//azbn.echo(azbn.mdl('cfg').vk.appId);

var log_name = 'mysql_script';

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.echo('Could not connect to mysql');
		
	} else {
		
		azbn.echo('DB is connected');  
		
		azbn.mdl('mysql').query("SELECT * FROM `realty` WHERE 1 ORDER BY id", function(err, rows, fields) {
			if (err) {
				
				azbn.echo('Error while performing Query. ' + err, log_name);
				
			} else if(rows.length == 0) {
				
				azbn.echo('No rows for action', log_name);
				
			} else {
				
				azbn.echo('Rows for update: ' + rows.length, log_name);
				
				
				rows.forEach(function(h){
					
					h.phone = '' + h.phone.trim();
					
					if(h.phone.indexOf('8') == 0) {
						h.phone.replace('8', '+7');
					}
					
					var _phone = h.phone.replace(/\D/g, '');
					
					var item = {
						created_at : Math.floor(azbn.now() / 1000),
						chat_id : 0,
						phone : _phone,
						main_info : [
							h.phone + ' Объявление ' +
							'[ ' + h.title,
							h.street + ', ' + h.home,
							'(' + h.floor + '/' + h.floor_all + ' эт.)',
							'комнат ' + h.room_count,
							h.square_all + ' кв.м ]',
						].join('. '),
						msg : '{}',
					};
					
					azbn.mdl('mysql').query("INSERT INTO `nodejs_azbnodebot_phonechecker` SET ? ", item, function(err, result) {
						if(result.insertId) {
							azbn.echo('Inserted #' + result.insertId);
						} else {
							
						}
					});
					
				});
				
				
			}
		});
		
	}
});

azbn.regEvent('vk_error', 'rootfile', function(prm){
	prm.created_at = Math.floor(azbn.now() / 1000);
	prm.error_code = prm.error.error_code;
	prm.error = JSON.stringify(prm.error);
	
	/*
	azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.vk_error + "` SET ? ", prm, function(err, result) {
		if(result.insertId) {
			azbn.echo('vk_error #' + result.insertId);
		} else {
			
		}
	});
	*/
	
});

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);