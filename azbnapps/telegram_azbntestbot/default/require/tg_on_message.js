/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message';
	var log_name = this.name;
	
	azbn.echo(JSON.stringify(msg));
	
	var text = '';
	var text_arr = [];
	
	if(msg.text) {
		
		var text = msg.text;
		
		var chat_text = text.split('@');
		if(chat_text[1] == 'AzbnTestBot') {
			text = chat_text[0];
			msg.text = text;
		}
		
		var text_arr = text.split(' ');
		//text_arr[0] = text_arr[0].split('@');
		
	}
	
	if(text != '') {
		
		var fnc = new require('./tg_message_command');
		
		fnc(azbn, {
			text : text,
			text_arr : text_arr,
			msg : msg,
			session : azbn.sess[msg.chat.id][msg.from.id],
		});
		
		azbn.echo('msg ' + msg.text + ' from chat #' + msg.chat.id, log_name);
	}
	
}

module.exports = _;