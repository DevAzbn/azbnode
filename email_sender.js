'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/email_sender',
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
azbn.load('nodemailer', require('nodemailer'));

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
		
		var cs = require(cfg.path.app + '/' + cfg.path.subapp + '/codestream');
		
		azbn.load('codestream', cs.set(azbn));
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.account + "` WHERE 1 ORDER BY id", function(err, rows, fields) {
			
			if (err) {
				
				azbn.echo('Error on load email-accounts: ' + err);
				
			} else if(rows.length == 0) {
				
				azbn.echo('No email-accounts in DB!');
				
			} else {
				
				for(var i = 0; i < rows.length; i++){
					
					var a = rows[i];
					azbn.mdl('cfg').account[a.id] = a;
					
				}
				
				azbn.echo('Init email-accounts from DB');
				
				var INTV = require(cfg.path.app + '/' + cfg.path.subapp + '/intervals');
				azbn.load('intervals', new INTV(azbn));
				
			}
			
		});
		
	}
});

azbn.regEvent('email_error', 'rootfile', function(prm){
	prm.created_at = Math.floor(azbn.now() / 1000);
	//prm.error_code = prm.error.error_code;
	prm.error = JSON.stringify(prm.error);
	
	azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.error + "` SET ? ", prm, function(err, result) {
		if(result.insertId) {
			azbn.echo('email_error #' + result.insertId);
		} else {
			
		}
	});
	
});

/*
azbn.mdl('vkstream')
	.add(function(next){
		azbn.echo('2 ' + azbn.now());
		next();
	})
	.add(function(next){
		azbn.echo('3 ' + azbn.now());
		next();
	}, 3000)
	;
*/

/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);