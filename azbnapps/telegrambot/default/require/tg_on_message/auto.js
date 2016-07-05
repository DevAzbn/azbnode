/*
вынесенная функция
*/

function translite(str) {
	var L = {
		'А' : 'A', 'В' : 'B', 'Е' : 'E', 'К' : 'K', 'М' : 'M',
		'Н' : 'H', 'О' : 'O', 'Р' : 'P', 'С' : 'C', 'Т' : 'T',
		'У' : 'Y', 'Х' : 'X',
	},
	result = '';
	
	for(var i = 0; i < str.length; i++) {
		var _sym = '';
		var sym = str[i];
		if(L[sym]) {
			_sym = L[sym];
		} else {
			_sym = sym;
		}
		result = '' + result + _sym;
	}
	
	return result;
}

function _(azbn, msg) {
	this.name = 'tg_on_message_auto';
	var log_name = this.name;
	
	var resp = '';
	
	var msg_arr = msg.text.split(' ');
	
	if(msg_arr[1] && msg_arr[1] != 'find') {
		
		msg_arr[1] = translite(msg_arr[1].toUpperCase());
		
		if(msg_arr[1].length > 0) {
			
			var item = {
				created_at : Math.floor(azbn.now() / 1000),
				chat_id : msg.chat.id,
				num : msg_arr[1],
				main_info : msg.text.replace('/auto ', ''),
				msg : JSON.stringify(msg),
			};
			
			azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.autochecker + "` SET ? ", item, function(err, result) {
				
				if(err) {
					
					resp = JSON.stringify(err);
					
				} else {
					
					if(result.insertId) {
						
						resp = 'Информация о номере принята';
						
						azbn.echo('Save auto review #' + result.insertId + ' from chat #' + msg.chat.id);
						
					} else {
						
						resp = 'Сохранить информацию не получилось';
						
					}
					
				}
				
				azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
					reply_to_message_id : msg.message_id,
					caption: 'Информация о номере автомобиля',
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				reply_to_message_id : msg.message_id,
				caption: 'Информация о номере автомобиля',
			});
			
		}
		
	} else if(msg_arr[1] == 'find') {
		
		msg_arr[2] = translite(msg_arr[2].toUpperCase());
		
		if(msg_arr[2].length > 0) {
			
			azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.autochecker + "` WHERE num LIKE '%" + msg_arr[2] + "%' ORDER BY created_at DESC LIMIT 5", function(err, rows, fields) {
				
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
					caption: 'Информация о номере автомобиля',
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				reply_to_message_id : msg.message_id,
				caption: 'Информация о номере автомобиля',
			});
			
		}
		
	} else {
		
		resp = 'Введите номер автомобиля';
		
		azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
			reply_to_message_id : msg.message_id,
			caption: 'Информация о номере автомобиля',
		});
		
	}
	
	azbn.echo(msg.text, log_name);
	
}

module.exports = _;