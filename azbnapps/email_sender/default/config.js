/*
Конфиг
*/

module.exports = {
	
	path : './azbnapps/email_sender/default',
	
	dbt : {
		
		error				: 'email_sender_error',
		account				: 'email_sender_account',
		recipient			: 'email_sender_recipient',
		msg					: 'email_sender_msg',
		tosend				: 'email_sender_tosend',
		
	},
	
	account : {
		
	},
	
	iteration_count : 5,
	
	charset : 'utf8',
	
	html_path : 'D:/project/azbnode/azbnapps/email_sender/default/html/',
	
};