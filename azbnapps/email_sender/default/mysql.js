/*
подключение к БД MySQL
*/

var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'email_sender', //nodejs
});

//connection.connect();

module.exports = connection;
