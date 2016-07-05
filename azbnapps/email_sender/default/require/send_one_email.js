/*
добавление новых друзей
*/

function _(azbn) {
	this.name = 'send_one_email';
	var log_name = this.name;
	
	var __moment = Math.floor(azbn.now() / 1000);
	//var dl = ds - 2160;
	
	azbn.mdl('mysql').query(
		"SELECT `" + azbn.mdl('cfg').dbt.msg + "`.*, `" + azbn.mdl('cfg').dbt.recipient + "`.email AS email, `" + azbn.mdl('cfg').dbt.tosend + "`.* " +
			"FROM `" + azbn.mdl('cfg').dbt.msg + "`, `" + azbn.mdl('cfg').dbt.recipient + "`, `" + azbn.mdl('cfg').dbt.tosend + "`" +
			"WHERE ( " +
				"`" + azbn.mdl('cfg').dbt.tosend + "`.status < 1 " +
				" AND " +
				"`" + azbn.mdl('cfg').dbt.tosend + "`.recipient = `" + azbn.mdl('cfg').dbt.recipient + "`.id " +
				" AND " +
				"`" + azbn.mdl('cfg').dbt.tosend + "`.msg = `" + azbn.mdl('cfg').dbt.msg + "`.id " +
				" AND " +
				"`" + azbn.mdl('cfg').dbt.msg + "`.status = 1 " +
			") " +
			"ORDER BY RAND() LIMIT " + azbn.mdl('cfg').iteration_count, function(err, rows, fields) {
		if (err) {
			
			azbn.echo('Error while performing Query. ' + err, log_name);
			
		} else if(rows.length == 0) {
			
			azbn.echo('No rows for action', log_name);
			
		} else {
			
			azbn.echo('Rows for update: ' + rows.length, log_name);
			
			rows.forEach(function(item){
				
				azbn.mdl('mysql').query("UPDATE `" + azbn.mdl('cfg').dbt.tosend + "` SET status = '1', created_at = '" + __moment + "' WHERE id = '" + item.id + "'", function (err, uresult) {
					azbn.echo('[ Updated tosend #' + item.id + ' ]', log_name);
				});
				
				azbn.mdl('codestream')
					.add(function(next){
						
						var html_file = item.tpl;//azbn.mdl('cfg').html_path + item.msg + '.html';
						
						azbn.mdl('fs').readFile(html_file, azbn.mdl('cfg').charset, function(err, text) {
							
							if(err) {
								
								azbn.echo('Error: ' + err, log_name);
								
							} else {
								
								if(text && text != '') {
									
									var _text = text.replace(new RegExp('({{html}})', 'ig'), item.html);
									_text = _text.replace(new RegExp('({{recipient}})', 'ig'), item.email);
									_text = _text.replace(new RegExp('({{item_id}})', 'ig'), item.id);
									
									if(_text != '') {
										
										var acc = azbn.mdl('cfg').account[item.account]
										
										var transporter = azbn.mdl('nodemailer').createTransport(acc.transport);
										
										var mailOptions = {
											from: item.name + ' <' + acc.login + '>', // sender address
											to: item.email, // list of receivers
											subject: item.subject + ' #' + item.id, // Subject line
											//text: item.text, // plaintext body
											html: _text, // html body
										};
										
										// send mail with defined transport object
										transporter.sendMail(mailOptions, function(error, info){
											
											if(error){
												
												azbn.echo('Error: ' + error, log_name);
												
											} else {
												
												azbn.echo('Message sent: ' + info.response, log_name);
												
											}
											
										});
										
									}
									
								}
								
							}
							
						});
						
						next();
					}, 1985)
					;
				
			});
			
		}
	});
	
	//azbn.echo(azbn.now() / 1000, log_name);
}

module.exports = _;