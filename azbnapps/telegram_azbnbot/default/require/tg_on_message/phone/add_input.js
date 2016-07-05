/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_phone_add_input';
	var log_name = this.name;
	
	var resp = '';
	
	var msg_arr = msg.text.split(' ');
	
	if(msg_arr[0]) {
		
		msg_arr[0] = msg_arr[0].replace(/\D/g, '');
		
		if(msg_arr[0].length > 0) {
			
			var item = {
				created_at : Math.floor(azbn.now() / 1000),
				chat_id : msg.chat.id,
				phone : msg_arr[0],
				main_info : msg.text,
				msg : JSON.stringify(msg),
			};
			
			azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.phonechecker + "` SET ? ", item, function(err, result) {
				
				if(err) {
					
					resp = JSON.stringify(err);
					
				} else {
					
					if(result.insertId) {
						
						resp = 'Информация о номере принята';
						
						azbn.echo('Save phone review #' + result.insertId + ' from chat #' + msg.chat.id);
						
					} else {
						
						resp = 'Сохранить информацию не получилось';
						
					}
					
				}
				
				azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
					reply_to_message_id : msg.message_id,
					caption: 'Информация о телефоне',
					parse_mode : 'HTML',
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				//reply_to_message_id : msg.message_id,
				caption: 'Информация о телефоне',
				parse_mode : 'HTML',
			});
			
		}
		
	} else {
		
		resp = 'Введите номер телефона в международном формате';
		
		azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
			//reply_to_message_id : msg.message_id,
			caption: 'Информация о телефоне',
			parse_mode : 'HTML',
		});
		
	}
	
	azbn.echo(msg.text, log_name);
	
}

module.exports = _;