/*
обработчики запроса к серверу
*/

module.exports = {
	
	default : function($) {
		
		var result = {
			'/' : {
				item_list : {
					
				},
				is_file : 0,
				name : '/',
				path : '/',
			},
		};
		
		var readDir = function(base, parent) {
			
			items = $.azbn.mdl('fs').readdirSync($.config.path.app + '/' + $.config.path.root + '/' + base);
			items.forEach(function(item){
				//$.azbn.echo(item);
				
				parent.item_list[item] = {};
				var state = $.azbn.mdl('fs').statSync($.config.path.app + '/' + $.config.path.root + '/' + base + '/' + item);
				
				parent.item_list[item].name = item;
				parent.item_list[item].path = base + '/' +item;
				
				if(state.isDirectory()) {
					parent.item_list[item].is_file = 0;
					parent.item_list[item].item_list = {};
					readDir(base + '/' + item, parent.item_list[item]);
				} else {
					parent.item_list[item].is_file = 1;
				}
				
			});
			
		};
		
		readDir('', result['/']);
		
		$.res.end(JSON.stringify(result));
		
	},
	
};