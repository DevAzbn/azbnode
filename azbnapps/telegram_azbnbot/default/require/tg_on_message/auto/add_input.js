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
	this.name = 'tg_on_message_auto_add_input';
	var log_name = this.name;
	
	var resp = '';
	
	var msg_arr = msg.text.split(' ');
	
	if(msg_arr[0]) {
		
		msg_arr[0] = translite(msg_arr[0].toUpperCase());
		
		if(msg_arr[0].length > 0) {
			
			var item = {
				created_at : Math.floor(azbn.now() / 1000),
				chat_id : msg.chat.id,
				num : msg_arr[0],
				main_info :msg.text,
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
					parse_mode : 'HTML',
				});
				
			});
			
		} else {
			
			resp = 'Номер не соответствует формату';
			
			azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
				//reply_to_message_id : msg.message_id,
				caption: 'Информация о номере автомобиля',
				parse_mode : 'HTML',
			});
			
		}
		
	} else {
		
		resp = 'Введите номер автомобиля';
		
		azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
			//reply_to_message_id : msg.message_id,
			caption: 'Информация о номере автомобиля',
			parse_mode : 'HTML',
		});
		
	}
	
	azbn.echo(msg.text, log_name);
	
}

module.exports = _;