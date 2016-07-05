/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_auto_index';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 'Выберите одну из команд';//JSON.stringify(msg);
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		//reply_to_message_id : msg.message_id,
		caption: 'Сервис отзывов на автомобильные номера',
		reply_markup: JSON.stringify({
			keyboard: [
				['➕ Добавить', '🔎 Найти', '🆕 Новые'],
				['⬅ Меню']
			],
			//force_reply: true,
			//selective: true
			//hide_keyboard :true,
		}),
		//one_time_keyboard : true,
		//resize_keyboard : true,
		
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;