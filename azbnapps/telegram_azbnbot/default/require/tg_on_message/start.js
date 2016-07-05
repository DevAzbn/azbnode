/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_start';
	var log_name = this.name;
	
	//azbn.mdl('sess')[msg.chat.id][msg.from.id].command = ['start'];
	
	var resp = 		'Официальный бот сайта http://azbn.ru 🇷🇺 \n\nВыберите в главном меню ( /start ) один из сервисов и следуйте указаниям.\n' +
					'Например, бот хранит и ищет отзывы пользователей о владельцах телефонов и автомобилей. Точнее, о том, как они ведут себя в социуме 😉\n' +
					'Просто введите искомый номер и в ответ придут отзывы пользователей, которые сталкивались уже с обладателями искомых номеров\n' +
					'Либо оставьте свой отзыв, который смогут прочитать все желающие.';
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		//reply_to_message_id : msg.message_id,
		caption: 'AzbnTestBot',
		parse_mode : 'HTML',
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