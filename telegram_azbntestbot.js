'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/telegram_azbntestbot',
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
//azbn.load('mysql', require(cfg.path.app + '/' + cfg.path.subapp + '/mysql'));
azbn.load('tg', require(cfg.path.app + '/' + cfg.path.subapp + '/telegrambot'));
//azbn.load('sess', require(cfg.path.app + '/' + cfg.path.subapp + '/sess'));
azbn.sess = {};

var taskStream = require(cfg.path.azbnode + '/mdl/taskstream');
azbn.load('ts', taskStream.set(azbn));

azbn.load('cl', new require(cfg.path.azbnode + '/mdl/commandlinectrl'));

azbn.event('loaded_mdls', azbn);

/* --------- Код здесь --------- */

//azbn.echo(azbn.mdl('cfg').vk.appId);

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
			//command : [],
			//active : {},
			created_at : azbn.now(),
			last_act : azbn.now(),
		}
	}
	azbn.echo(JSON.stringify(msg));
	require(cfg.path.app + '/' + cfg.path.subapp + '/require/tg_on_message')(azbn, msg);
});

azbn.mdl('tg').on('inline_query', function(msg) {
	var q_id = msg.id;
	var q_query = msg.query;
	
	azbn.echo(JSON.stringify(msg));
	
	//var q_from = msg.from;
	//var q_offset = msg.offset;
	var results = [];
	
	for (var i = 0; i < 10; ++i) {
		var InlineQueryResultPhoto = {
			'type': 'photo', 
			'photo_url': 'http://exlmoto.ru/wp-content/Images/E770vE1000/large/' + q_query + '.jpg',
			'thumb_url': 'http://exlmoto.ru/wp-content/Images/E770vE1000/' + q_query + '.jpg',
			'id': '287878416582808857/' + i,
			'photo_width': 48,
			'photo_height': 48
		};
		results.push(InlineQueryResultPhoto);
	}
	
	azbn.mdl('tg').answerInlineQuery(q_id, results);
});

azbn.mdl('tg').on('chosen_inline_result', function(msg) {
	azbn.echo('Выбрано:' + JSON.stringify(msg));
});

azbn.mdl('ts')
	.add(function(next){
		azbn.echo('X');
		next();
	}, 1000)
	.add(function(next){
		azbn.echo('XX');
		next();
	}, 1000)
	.add(function(next){
		azbn.echo('XXX');
		next();
	}, 1000)
	.add(function(next){
		azbn.echo('XXXX');
		next();
	}, 1000)
	.add(function(next){
		azbn.echo('XXXXX');
		next();
	}, 1000)
	;

/*
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
*/
/* --------- /Код здесь --------- */

azbn.event('eval_script', azbn);