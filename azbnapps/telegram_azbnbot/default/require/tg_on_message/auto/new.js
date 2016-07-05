/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_auto_new';
	var log_name = this.name;
	
	var resp = '';
	
	azbn.mdl('mysql').query("SELECT * FROM `" + azbn.mdl('cfg').dbt.autochecker + "` WHERE 1 ORDER BY created_at DESC LIMIT 10", function(err, rows, fields) {
		
		if (err) {
			
			resp = JSON.stringify(err);
			
		} else if(rows.length == 0) {
			
			resp = 'Ничего не найдено!';
			
		} else {
			
			resp = 'Новые отзывы в раззделе:' + "\n\n";
			
			var i = 1;
			
			rows.forEach(function(h){
				resp = resp + '<b>' + i + ')</b> ' + h.main_info + "\n\n";
				i++;
			});
			
		}
		
		azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
			reply_to_message_id : msg.message_id,
			caption: 'Информация об автомобильных номерах',
			parse_mode : 'HTML',
		});
		
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;