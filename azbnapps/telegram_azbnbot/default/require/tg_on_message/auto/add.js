/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_auto_add';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 'Для добавления введите номер автомобиля и комментарий к нему\nНапример:\n\n<b>e101kx57rus Подрезал меня, когда я делал двойной обгон по встречке!</b>';//JSON.stringify(msg);
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		//reply_to_message_id : msg.message_id,
		caption: 'Запрос номера автомобиля',
		reply_markup: JSON.stringify({
			keyboard: [['⬅ Меню']],
			hide_keyboard : true,
		}),
		parse_mode : 'HTML',
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;