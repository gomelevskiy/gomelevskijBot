// includes
const Telegraf = require('telegraf');
const http = require('request');
const unirest = require('unirest');
const TelegrafInlineMenu = require('telegraf-inline-menu');
const paramTrello = {
  page: "AvJmy7iN",
  key: "af5c385fa0bbcca4ef1d6c0692a95531",
  token: "2213c6ce8516841f60b276fe1c4431096b7b9333bcede41f05a791f98b90e5d9"
};

// init app
const app = new Telegraf(process.env.BOT_TOKEN);

app.start((ctx) => ctx.reply("Welcome, " + ctx.message.from.last_name + " " + ctx.message.from.first_name));
app.command('test', (ctx) => ctx.reply('Test'));

app.hears('hi', ctx => {

  let msg = '';
  msg = 'Сказал мне ' + ctx.message.text;
  return ctx.reply(msg);
});

const menu = new TelegrafInlineMenu(ctx => `Привет, ${ctx.from.first_name} 👋\nЧто тебе нужно?`);
menu.setCommand('trello');
menu.simpleButton('Получить колонки', 'a', {
  joinLastRow: true,
  doFunc: ctx => {

    let url = '';
    url = "https://api.trello.com/1/boards/"+ paramTrello.page +"?fields=all&key="+ paramTrello.key +"&token=" + paramTrello.token;
    return ctx.reply(url);
    // get lists
    httpGet(url)
      return ctx.reply('Тут был');

      .then(response => {
        return ctx.reply('Тут был тоже');
        let board = JSON.parse(response);
        // return ctx.reply(board);
      })

    }
});

app.use(menu.init());

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.catch(error => {
  console.log('telegraf error (Тут ошибки есть)', error.response, error.parameters, error.on || error);
});

app.launch();

// FUNCTION GET
function httpGet(url) {

  return new Promise(function(resolve, reject) {
    var req = unirest("GET", url);

    req.headers({
      "cache-control": "no-cache"
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      return res.body;
    });
  });
}