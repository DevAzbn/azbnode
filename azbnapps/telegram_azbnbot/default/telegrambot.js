/*
бот телеграма
*/

var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot('184813358:AAEqd6_Kq6ksuemea_H8t5rluEbt7v2A5JE', {polling: true});

module.exports = bot;