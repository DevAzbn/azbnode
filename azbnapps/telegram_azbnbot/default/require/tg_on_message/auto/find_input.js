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
	this.name = 'tg_on_message_phone_find_input';
	var log_name = this.name;
	
	var resp = '';
	
	var msg_arr = msg.text.split(' ');
	
	msg_arr[0] = translite(msg_arr[0].toUpperCase());
	
	if(msg_arr[0].length > 0) {
		
		azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.autochecker + "` WHERE num LIKE '%" + msg_arr[0] + "%' ORDER BY created_at DESC LIMIT 50", function(err, rows, fields) {
			
			if (err) {
				
				resp = JSON.stringify(err);
				
			} else if(rows.length == 0) {
				
				resp = 'Ничего не найдено!';
				
			} else {
				
				resp = 'Результаты поиска:' + "\n\n";
				
				var i = 1;
				
				rows.forEach(function(h){
					resp = resp + '<b>' + i + ')</b> ' + h.main_info + "\n\n";
					i++;
				});
				
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
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;