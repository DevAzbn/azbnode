/*
вынесенная функция
*/

function _(azbn, me) {
	this.name = 'tg_getMe';
	var log_name = this.name;
	
	azbn.echo('Name is ' + me.first_name, log_name);
	azbn.echo('Id is ' + me.id, log_name);
	azbn.echo('Username is ' + me.username, log_name);
	
	azbn.mdl('tg').sendMessage(-107139655, 'Бот ' + me.username + ' в сети', {
		//reply_to_message_id : msg.message_id,
		caption: 'Подключение к Телеграму',
	});
	
	var resp = '';
	
	azbn.mdl('cl').runTask({
		line : 'dir',
		param : [],
	}, {
		onOut : function(data) {
			resp = resp + '\n' + data.toString();
		},
		onError : function(data) {
			resp = resp + '\n' + data.toString();
		},
		onClose : function(data) {
			azbn.mdl('tg').sendMessage(-107139655, resp, {
				//reply_to_message_id : msg.message_id,
				caption: 'Ответ на команду: ' + data,
			});
		},
	});
}

module.exports = _;