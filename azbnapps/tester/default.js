//var assert = require('assert');

var test = function(azbn) {
	
	this.name = 'default';
	
	this.need = 0;
	
	this.code = function(){
		var r = 0;
		/*
		new Promise(function(rs, rj){
			r++
			return rs('test');
		})
			.then(function(val){
				val++;
				azbn.echo(val);
				return val;
			})
			.then(function(val){
				val++;
				azbn.echo(val);
				return val;
			})
			.catch(function(err){
				azbn.echo(err);
			});
		*/
		return r;
	};
	
	this.action = function(check, need, result) {
		azbn.echo('\nПроверка ' + this.name + ', #' + azbn.mdl('tester').tests[this.name].count);
		azbn.mdl('tester').tests[this.name].history[azbn.mdl('tester').tests[this.name].count] = check;
		if(check) {
			azbn.echo('\n\n++++++++++            ++++++++++\n++++++++++ Все хорошо ++++++++++\n++++++++++            ++++++++++\n\n\n');
		} else {
			azbn.echo('\n\n---------- Не все хорошо ---------- need:' + need + ' result: ' + result + '\n\n\n');
		}
	};
	
	return this;
	
}

module.exports = test;