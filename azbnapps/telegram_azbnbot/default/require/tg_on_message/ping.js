/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message_ping';
	var log_name = this.name;
	
	var resp = 	'/pong';
	
	azbn.mdl('tg').sendMessage(msg.chat.id, resp, {
		reply_to_message_id : msg.message_id,
		caption: 'Response',
	});
	
	azbn.echo(msg.text, log_name);
}

module.exports = _;