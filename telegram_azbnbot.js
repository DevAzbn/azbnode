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

azbn.load('fs', require('fs'));
//azbn.load('querystring', require('querystring'));
//azbn.load('path', require('path'));
azbn.load('url', require('url'));
azbn.load('cfg', require(cfg.path.app + '/' + cfg.path.subapp + '/config'));
azbn.load('mysql', require(cfg.path.app + '/' + cfg.path.subapp + '/mysql'));
azbn.load('tg', require(cfg.path.app + '/' + cfg.path.subapp + '/telegrambot'));
azbn.sess = {};

azbn.event('loaded_mdls', azbn);

/* --------- Код здесь --------- */

//azbn.echo(azbn.mdl('cfg').vk.appId);

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.echo('Could not connect to mysql');
		
	} else {
		
		azbn.echo('DB is connected');  
		
		var INTV = require(cfg.path.app + '/' + cfg.path.subapp + '/intervals');
		azbn.load('intervals', new INTV(azbn));
		
		azbn.mdl('tg').getMe().then(function(me) {
			require(cfg.path.app + '/' + cfg.path.subapp + '/require/tg_getMe')(azbn, me);
		});

		azbn.mdl('tg').on('message', function (msg) {
			if(!azbn.sess[msg.chat.id]) {
				azbn.sess[msg.chat.id] = {};
			}
			if(!azbn.sess[msg.chat.id][msg.from.id]) {
				azbn.sess[msg.chat.id][msg.from.id] = {
					command : [],
				}
			}
			
			require(cfg.path.app + '/' + cfg.path.subapp + '/require/tg_on_message')(azbn, msg);
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