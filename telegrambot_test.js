'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/telegrambot',
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
//azbn.load('tg', require(cfg.path.app + '/' + cfg.path.subapp + '/telegrambot'));
azbn.load('vk', require(cfg.path.app + '/' + cfg.path.subapp + '/vk'));

//var vks = require(cfg.path.app + '/' + cfg.path.subapp + '/vkstream');
var vks2 = require(cfg.path.app + '/' + cfg.path.subapp + '/vkstream');
//azbn.load('vkstream', vks.set(azbn));
azbn.load('vkstream2', vks2.set(azbn));

var INTV = require(cfg.path.app + '/' + cfg.path.subapp + '/intervals_test');
azbn.load('intervals_test', new INTV(azbn));

azbn.event('loaded_mdls', azbn);

/* --------- Код здесь --------- */

//azbn.echo(azbn.mdl('cfg').vk.appId);

azbn.mdl('mysql').connect(function(err){
	
	if(err) {
		
		azbn.echo('Could not connect to mysql');
		
	} else {
		
		azbn.echo('DB is connected');  
		
		/*
		azbn.mdl('vkstream')
			.add(function(next){
				//azbn.echo(azbn.now());
				next();
			});
		*/
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.vk_app + "` WHERE 1 ORDER BY id", function(err, rows, fields) {
			
			if (err) {
				
				azbn.echo('Error on load VK-apps: ' + err);
				
			} else if(rows.length == 0) {
				
				azbn.echo('No VK-apps in DB!');
				
			} else {
				
				for(var i = 0; i < rows.length; i++){
					
					var a = rows[i];
					azbn.mdl('cfg').vk_app[a.id] = a;
					
				}
				
				azbn.echo('Init VK-apps from DB');
				
				//clear('load_vk_app');
				
			}
			
		});
		
	}
});

azbn.regEvent('vk_error', 'rootfile', function(prm){
	prm.created_at = Math.floor(azbn.now() / 1000);
	prm.error_code = prm.error.error_code;
	prm.error = JSON.stringify(prm.error);
	
	azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.vk_error + "` SET ? ", prm, function(err, result) {
		if(result.insertId) {
			azbn.echo('vk_error #' + result.insertId);
		} else {
			
		}
	});
	
});

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);