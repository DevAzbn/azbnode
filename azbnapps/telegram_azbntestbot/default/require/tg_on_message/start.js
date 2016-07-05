/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_start';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 'Запустите один из предложенных сервисов';//JSON.stringify(msg);
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		//reply_to_message_id : msg.message_id,
		caption: 'AzbnTestBot',
		reply_markup: JSON.stringify({
			keyboard: [
				['☎ Телефоны', '🚗 Авто', ],//'👏 Ping'
				//['⬅ Меню']
			],
			//force_reply: true,
			//selective: true
		}),
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;