// includes
const Telegraf = require('telegraf');
const http = require('request');
const TelegrafInlineMenu = require('telegraf-inline-menu');
const paramTrello = {
  page: "AvJmy7iN",
  pageId: "5c5d92365e0bd961fa440ef4",
  key: "af5c385fa0bbcca4ef1d6c0692a95531",
  token: "2213c6ce8516841f60b276fe1c4431096b7b9333bcede41f05a791f98b90e5d9"
};

// init app & menu
const app = new Telegraf(process.env.BOT_TOKEN);

app.start((ctx) => ctx.reply("Welcome, " + ctx.message.from.last_name + " " + ctx.message.from.first_name));
app.command('test', (ctx) => ctx.reply('Test'));

// app.use((ctx) => ctx.reply(ctx.message.text + " сказал " + ctx.message.from.last_name + " " + ctx.message.from.first_name));

app.hears('hi', ctx => {

  let msg = '';
  msg = 'Сказал мне ' + ctx.message.text;
  return ctx.reply(msg);
});

app.hears('trello', ctx => {

  let url = "https://api.trello.com/1/boards/"+ paramTrello.page +"/cards&key="+ paramTrello.key +"&token=" + paramTrello.token;
  http.get(url, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body: ' + body);
    if(response.statusCode===200){
      let msg = '';
      msg = JSON.parse(body);
      return ctx.reply('Название доски: ' + msg.name);
    }
    if(response.statusCode!==200){
      let msg = '';
      msg = 'Ошибочка произошла!';
      return ctx.reply(msg);
    }
  });

});

const menu = new TelegrafInlineMenu(ctx => `Привет, ${ctx.from.first_name} 👋\nГотов сыграть со мной в игру ❔`);
menu.setCommand('menu');
menu.simpleButton('Да ✅', 'a', {
  joinLastRow: true,
  doFunc: ctx => {
  	ctx.reply(questions.length);
  }
});

menu.simpleButton('Нет ❌', 'b', {
  joinLastRow: true,
  doFunc: ctx => {
  	ctx.reply('Не правильный выбор 👎');
  }
});

app.use(menu.init());

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error);
});

app.launch();