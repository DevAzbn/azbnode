/*
вынесенная функция
*/

var last_text = '';

function _(azbn, msg) {
	this.name = 'tg_on_message_phone_find_input';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = '';
	
	if(msg.text != last_text) {
		resp = 'Номер отличается от предыдущего';
	} else {
		resp = 'Номер не изменился';
	}
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		reply_to_message_id : msg.message_id,
		caption: 'Проверка номера телефона',
		reply_markup: JSON.stringify({
			keyboard: [['⬅ Меню']],
			hide_keyboard :true,
		}),
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;