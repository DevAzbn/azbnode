/*
вынесенная функция
*/
var r;

r = {
	
	children : {
		
		'/start' : {
			return_keyboard : true,
			need_input : false,
			onCommand : function(azbn, cmd) {
				
				azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'Выберите сервис', {
					caption: 'AzbnTestBot',
					reply_markup: JSON.stringify({
						keyboard : this.keyboard,
						one_time_keyboard : true,
						resize_keyboard : true,
						selective : false,
						force_reply : true,
					}),
				});
				
			},
			onInput : function(azbn, cmd) {},
			keyboard : [
				['☎ Телефоны', '🚗 Авто', ],
				['⬅ Меню', '👏 Ping', ]
			],
			children : {
				
				
				'☎ Телефоны' : {
					return_keyboard : true,
					keyboard : [
						['Добавить', 'Найти', ],
						['Последние', 'Свежие', ]
					],
					onCommand : function(azbn, cmd) {
						
						azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'Выберите функцию', {
							caption: 'AzbnTestBot',
							reply_markup: JSON.stringify({
								keyboard : this.keyboard,
								one_time_keyboard : true,
								resize_keyboard : true,
								selective : false,
								force_reply : true,
							}),
						});
						
					},
					children : {
						'Добавить' : {
							need_input : true,
							onInput : function(azbn, cmd) {
								
								azbn.mdl('tg').sendMessage(cmd.msg.chat.id, cmd.msg.text, {
									caption: 'AzbnTestBot',
								});
								
								cmd.session.active = r.children['/start'].children['☎ Телефоны'];
								cmd.session.active.onCommand(azbn, cmd);
								
							},
							onCommand : function(azbn, cmd) {
								
								azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'Введите значение', {
									caption: 'AzbnTestBot',
								});
								
							},
						},
						'Найти' : {
							
						},
						'Последние' : {
							
						},
						'Свежие' : {
							
						},
					},
				},
				
				
				'🚗 Авто' : {
					
				},
				
				
				'⬅ Меню' : {
					
				},
				
				
				'👏 Ping' : {
					return_keyboard : false,
					need_input : false,
					
					onCommand : function(azbn, cmd) {
						
						azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'PONG!', {
							reply_to_message_id : cmd.msg.message_id,
							caption: 'AzbnTestBot',
						});
						
						cmd.session.active = r.children['/start'];
						
					},
				},
				
				
			},
		},
		
		
		'/help' : {
			onCommand : function(azbn, cmd) {
				
				azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'Тут должен быть текст о помощи', {
					caption: 'AzbnTestBot',
				});
				
				cmd.session.active = r.children['/start'];
				cmd.session.active.onCommand(azbn, cmd);
				
			},
		},
		
		
		'/hide' : {
			return_keyboard : true,
			keyboard : [],
			onCommand : function(azbn, cmd) {
				
				azbn.mdl('tg').sendMessage(cmd.msg.chat.id, 'Скрыть клавиатуру', {
					caption: 'AzbnTestBot',
					reply_markup: JSON.stringify({
						keyboard : this.keyboard,
						one_time_keyboard : true,
						resize_keyboard : true,
						selective : false,
						force_reply : true,
					}),
				});
				
			},
		}
		
		
	},
	
};

function _(azbn, cmd) {
	this.name = 'tg_message_command';
	var log_name = this.name;
	
	var ctrl = this;
	
	ctrl.route = function() {
		
		if(cmd.session.active) {
			
		} else {
			cmd.session.active = r;
		}
		
		//azbn.echo(JSON.stringify(cmd.text), log_name);
		
		if(cmd.session.active.children && cmd.session.active.children[cmd.text]) {
			
			azbn.echo('x1', log_name);
			
			cmd.session.active = cmd.session.active.children[cmd.text];
			cmd.session.active.onCommand(azbn, cmd);
			
		} else if(cmd.session.active.need_input) {
			
			azbn.echo('x2', log_name);
			
			cmd.session.active.onInput(azbn, cmd);
			
		} else if(r.children[cmd.text]) {
			
			azbn.echo('x3', log_name);
			
			cmd.session.active = r.children[cmd.text];
			cmd.session.active.onCommand(azbn, cmd);
			
		} else {
			
			azbn.echo('x4', log_name);
			
			cmd.session.active = r.children['/start'];
			cmd.session.active.onCommand(azbn, cmd);
			
		}
		
		//azbn.echo(JSON.stringify(cmd.session.active), log_name);
	}
	
	ctrl.route();
	
	return ctrl;
}

module.exports = _;