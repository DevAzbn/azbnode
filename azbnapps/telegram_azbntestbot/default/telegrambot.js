/*
бот телеграма
*/

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot('186711449:AAECXseoTSk72NIuCuAO7Z3dBLqU1orFTCM', {polling: true});

module.exports = bot;