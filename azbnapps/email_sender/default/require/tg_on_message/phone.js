/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_phone';
	var log_name = this.name;
	
	var resp = '';
	
	var msg_arr = msg.text.split(' ');
	
	if(msg_arr[1] && msg_arr[1] != 'find') {
		
		msg_arr[1] = msg_arr[1].replace(/D/g, '');
		
		if(msg_arr[1].length > 0) {
			
			var item = {
				created_at : Math.floor(azbn.now() / 1000),
				chat_id : msg.chat.id,
				phone : msg_arr[1],
				main_info : msg.text.replace('/phone ', ''),
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
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				reply_to_message_id : msg.message_id,
				caption: 'Информация о телефоне',
			});
			
		}
		
	} else if(msg_arr[1] == 'find') {
		
		msg_arr[2] = msg_arr[2].replace(/D/g, '');
		
		if(msg_arr[2].length > 0) {
			
			azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.phonechecker + "` WHERE phone LIKE '%" + msg_arr[2] + "%' ORDER BY created_at DESC LIMIT 5", function(err, rows, fields) {
				
				if (err) {
					
					resp = JSON.stringify(err);
					
				} else if(rows.length == 0) {
					
					resp = 'Ничего не найдено!';
					
				} else {
					
					resp = 'Результаты поиска:' + "\n";
					
					rows.forEach(function(h){
						resp = resp + h.id + ') ' + h.main_info + "\n";;
					});
					
				}
				
				azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
					reply_to_message_id : msg.message_id,
					caption: 'Информация о номере',
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				reply_to_message_id : msg.message_id,
				caption: 'Информация о номере',
			});
			
		}
		
	} else {
		
		resp = 'Введите номер телефона';
		
		azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
			reply_to_message_id : msg.message_id,
			caption: 'Информация о телефоне',
		});
		
	}
	
	azbn.echo(msg.text, log_name);
	
}

module.exports = _;