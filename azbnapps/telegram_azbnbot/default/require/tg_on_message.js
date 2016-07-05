/*
вынесенная функция
*/

function _(azbn, msg) {
	this.name = 'tg_on_message';
	var log_name = this.name;
	
	var text = msg.text;
	
	var text_arr = text.split(' ');
	
	//text_arr[0] = text_arr[0].split('@');
	
	
	if(text != '') {
		
		if(text == '/start' || text == '/help' || text_arr[1] == 'Меню') {
			azbn.sess[msg.chat.id][msg.from.id].command = ['/start'];
		} else {
			if(text_arr[1]) {
				azbn.sess[msg.chat.id][msg.from.id].command.push(text_arr[1]);
			} else {
				azbn.sess[msg.chat.id][msg.from.id].command.push(text_arr[0]);
			}
		}
		
		//text_arr[0][0]
		switch(azbn.sess[msg.chat.id][msg.from.id].command[0]) {
			
			
			
			case 'Ping' : {
				azbn.sess[msg.chat.id][msg.from.id].command = [];
				require('./tg_on_message/ping')(azbn, msg);
			}
			break;
			
			
			
			case 'Телефоны' : {
				//azbn.sess[msg.chat.id][msg.from.id].command.push(text_arr[0][0]);
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 1) {
					require('./tg_on_message/phone/index')(azbn, msg);
				}
				
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 2) {
					switch(azbn.sess[msg.chat.id][msg.from.id].command[1]) {
					
						case 'Добавить': {
							require('./tg_on_message/phone/add')(azbn, msg);
						}
						break;
						
						case 'Найти': {
							require('./tg_on_message/phone/find')(azbn, msg);
						}
						break;
						
						case 'Новые': {
							require('./tg_on_message/phone/new')(azbn, msg);
							
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/phone/index')(azbn, msg);
						}
						break;
						
						default: {
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/phone/index')(azbn, msg);
						}
						break;
						
					}
				}
				
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 3) {
					switch(azbn.sess[msg.chat.id][msg.from.id].command[1]) {
					
						case 'Добавить': {
							require('./tg_on_message/phone/add_input')(azbn, msg);
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
						}
						break;
						
						case 'Найти': {
							require('./tg_on_message/phone/find_input')(azbn, msg);
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
						}
						break;
						
						default: {
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/phone/index')(azbn, msg);
						}
						break;
						
					}
				}
				
			}
			break;
			
			
			
			case 'Авто' : {
				
				//azbn.sess[msg.chat.id][msg.from.id].command.push(text_arr[0][0]);
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 1) {
					require('./tg_on_message/auto/index')(azbn, msg);
				}
				
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 2) {
					switch(azbn.sess[msg.chat.id][msg.from.id].command[1]) {
					
						case 'Добавить': {
							require('./tg_on_message/auto/add')(azbn, msg);
						}
						break;
						
						case 'Найти': {
							require('./tg_on_message/auto/find')(azbn, msg);
						}
						break;
						
						case 'Новые': {
							require('./tg_on_message/auto/new')(azbn, msg);
							
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/auto/index')(azbn, msg);
						}
						break;
						
						default: {
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/auto/index')(azbn, msg);
						}
						break;
						
					}
				}
				
				if(azbn.sess[msg.chat.id][msg.from.id].command.length == 3) {
					switch(azbn.sess[msg.chat.id][msg.from.id].command[1]) {
					
						case 'Добавить': {
							require('./tg_on_message/auto/add_input')(azbn, msg);
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
						}
						break;
						
						case 'Найти': {
							require('./tg_on_message/auto/find_input')(azbn, msg);
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
						}
						break;
						
						default: {
							azbn.sess[msg.chat.id][msg.from.id].command.pop();
							require('./tg_on_message/auto/index')(azbn, msg);
						}
						break;
						
					}
				}
				
			}
			break;
			
			
			
			case '/start' :
			case 'Меню' : {
				azbn.sess[msg.chat.id][msg.from.id].command = [];
				require('./tg_on_message/start')(azbn, msg);
			}
			break;
			
			default : {
				
			}
			break;
			
		}
		
		//azbn.echo(JSON.stringify(azbn.sess[msg.chat.id][msg.from.id]));
		azbn.echo('msg from chat #' + msg.chat.id, log_name);
	}
	
	/*
	if(!text_arr[0][1] || text_arr[0][1] == '' || text_arr[0][1] == 'AzbnBot') {
		switch(text_arr[0][0]) {
			
			case '/start' : {
				require('./tg_on_message/start')(azbn, msg);
			}
			break;
			
			case '/ping' : {
				require('./tg_on_message/ping')(azbn, msg);
			}
			break;
			
			case '/phone' : {
				require('./tg_on_message/phone')(azbn, msg);
			}
			break;
			
			case '/auto' : {
				require('./tg_on_message/auto')(azbn, msg);
			}
			break;
			
			default : {
				
			}
			break;
			
		}
	}
	
	azbn.echo('msg from chat #' + msg.chat.id, log_name);
	*/
}

module.exports = _;