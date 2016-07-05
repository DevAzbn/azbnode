/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_phone_find';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 'Для поиска по базе данных введите номер телефона или его часть';//JSON.stringify(msg);
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		//reply_to_message_id : msg.message_id,
		caption: 'Запрос номера телефона',
		reply_markup: JSON.stringify({
			keyboard: [['⬅ Меню']],
			hide_keyboard :true,
		}),
		parse_mode : 'HTML',
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;