/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_addvkfr';
	var log_name = this.name;
	
	var text = msg.text;
	var text_arr = text.split(' ');
	
	var url_str = text_arr[1];
	var url_n = url_str.replace('#','?');
	var arr = azbn.mdl('url').parse(url_n, true);
	var access_token = arr.query.access_token;
	var user_id = arr.query.user_id;
	var email = arr.query.email;
	
	azbn.mdl('mysql').query("DELETE FROM `" + azbn.mdl('cfg').dbt.vk_token + "` WHERE `user_id` = '" + user_id + "'", function(err, result) {
		if (err) {
			
			azbn.echo('Error while performing Query.' + err, log_name);
			
		} else {
			
			var ds = Math.floor(azbn.now() / 1000);
			var dl = ds - 2160;
			
			var item = {
				access_token : access_token,
				user_id : user_id,
				email : email,
			};
			
			azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.vk_token + "` SET ? ", item, function(err, result) {
				if(result.insertId) {
					azbn.echo('Add token #' + result.insertId, log_name);
					
					azbn.mdl('tg').sendMessage(msg.chat.id, '#' + result.insertId, {
						reply_to_message_id : msg.message_id,
					});
					
					azbn.mdl('mysql').query("DELETE FROM `" + azbn.mdl('cfg').dbt.addvkfr + "` WHERE `user_id` = '" + user_id + "'", function(err, result) {
						if (err) {
							
							azbn.echo('Error while performing Query.' + err, log_name);
							
						} else {
							
							var addvkfr = {
								lastact : dl,
								user_id : user_id,
								p : '{}',
							};
							
							azbn.mdl('mysql').query("INSERT INTO `" + azbn.mdl('cfg').dbt.addvkfr + "` SET ? ", addvkfr, function(err, result) {
								if(result.insertId) {
									azbn.echo('Add task #' + result.insertId + ' for user #' + user_id, log_name);
								}
							});
							
						}
					});
					
					
					
				} else {
				
				}
			});
			
		}
	});
	
	
	//azbn.echo(text, log_name);
}

module.exports = _;