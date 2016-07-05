/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_phone_add';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 'Для добавления введите номер телефона в международном формате (например, +79999999999) и комментарий к нему\nНапример:\n\n<b>+79998887766 Продают странные яблоки - полосатые и с хвостами!</b>';//JSON.stringify(msg);
	
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