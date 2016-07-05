'use strict';
/*
Примерный файл подключения AzbNode
*/
var cfg = {
	'path' : {
		'azbnode' : './azbnode',
		'app' : './azbnapps/vktest',
	}
};

var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
//azbn.event('loaded_azbnode', azbn);

//azbn.load('fs', require('fs'));
var VK = require('vksdk');
azbn.load('vk', new VK({
	//'appId'     : 5172579,
	//'appSecret' : '0bfLMuOWLU1jptzZ4bVm',
	'appId'     : 5172708,
	'appSecret' : 'DcT2TMRKnXtdgl40DUaX',
	'language'  : 'ru',
}));
azbn.load('url', require('url'));

//azbn.event('loaded_mdls', azbn);

//парсинг параметров командной строки
azbn.parseArgv();
//azbn.event('parsed_argv', azbn);

/* --------- Код здесь --------- */


azbn.mdl('vk').on('serverTokenReady', function(_o) {
	azbn.mdl('vk').setToken(_o.access_token);
});


azbn.mdl('vk').setSecureRequests(true);
azbn.mdl('vk').setVersion(5.40);



//azbn.mdl('vk').request('secure.getSMSHistory', {}, function(_dd) {
//	azbn.echo(_dd);
//});



/*
azbn.mdl('vk').setToken('e12e3a1e6e70f292c22baf59d3ff2295182286dc2fd25b33c13920abc0bdcf2fd4d9b1fbbc15da1abe611');

azbn.mdl('vk').request('users.get', {'user_ids' : '336650466,110091436' , fields :'last_seen,common_count,relation,relatives,counters,screen_name,maiden_name' }, function(_o) {
	console.log(_o.response);
});
*/

//fields : 'sex,bdate,city,country,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,photo_id,online,online_mobile,domain,has_mobile,contacts,connections,site,education,universities,schools,can_post,can_see_all_posts,can_see_audio,can_write_private_message,status,last_seen,common_count,relation,relatives,counters,screen_name,maiden_name,timezone,occupation,activities,interests,music,movies,tv,books,games,about,quotes,personal,friend_status,military,career'



azbn.mdl('vk').setToken('b805467e1e7a2f8804ba7ff2a599e75d0e53fe93aaadfa767fa64974fa47c4077093cda92bba280f5a647');
/*
..azbn.mdl('vk').request('groups.invite', {'group_id' : 56606296, 'user_id' : 14558328, }, function(_o) {
..	console.log(_o);
..});
*/

azbn.mdl('vk').request('friends.get', {'user_id' : 14558328, 'order' : 'random', 'count' : 500, }, function(_o) {
	console.log(_o.response.count);
	//console.log(_o.response.items.join(','));
	azbn.mdl('vk').request('groups.isMember', {'group_id' : 29725382, 'user_ids' : _o.response.items.join(','), }, function(_o2) {
		var items = [];
		_o2.response.forEach(function(h){
			if(h.member) {
				items.push(h.user_id);
			}
		});
		console.log(items.join(','));
	});
});






/*
azbn.mdl('vk').request('friends.add', {'user_id' : 14558328, 'text' : 'test0001', 'https' : 1, }, function(_o) {
	console.log(_o);
	console.log(_o.error.request_params);//_o.error.request_params
});
*/


/*
var url = '';



var url = 'https://api.vk.com/blank.html#access_token=504c0cb77f3d3a9f01224df25b08c77cf8a5dd1f2a9f58753925c603cebd403a6d00114bfa3d19441f61c&expires_in=0&user_id=336650466&email=devazbn@yandex.ru';
//azbn.mdl('url').parse(url, true)
//var p = url.split('#');
var url_n = url.replace('#','?');
var arr = azbn.mdl('url').parse(url_n, true);
var token = arr.query.access_token;
var user_id = arr.query.user_id;

//console.log(token);


azbn.mdl('vk').setToken(token);
azbn.mdl('vk').setSecureRequests(true);
azbn.mdl('vk').setVersion(5.40);


azbn.mdl('vk').request('groups.invite', {'group_id' : 56606296, 'user_id' : 8598846, }, function(_o) {
	console.log(_o);
});

*/



/*
azbn.mdl('vk').request('friends.getMutual', {'source_uid' : 88453573, 'target_uid' : 269654732, }, function(_o) {
	console.log(_o);
});
*/

/* --------- /Код здесь --------- */

//azbn.event('eval_script', azbn);