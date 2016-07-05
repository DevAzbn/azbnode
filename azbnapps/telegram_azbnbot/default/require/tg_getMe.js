/*
вынесенная функция
*/

function _(azbn, me) {
	this.name = 'tg_getMe';
	var log_name = this.name;
	
	azbn.echo('Name is ' + me.first_name, log_name);
	azbn.echo('Id is ' + me.id, log_name);
	azbn.echo('Username is ' + me.username, log_name);
	
	//-107139655
	
	azbn.mdl('tg').sendMessage(-107139655, 'Бот ' + me.username + ' в сети', {
		//reply_to_message_id : msg.message_id,
		caption: 'Подключение к Телеграму',
	});
}

module.exports = _;