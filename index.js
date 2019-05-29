// includes
const Telegraf = require('telegraf');
const http = require('request');
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

    // get lists
    httpGet(url)
      .then(response => {
        let board = response;
        // return board.id;
        return ctx.reply(board);
      })

      // lists arr
      .then(board => {
        let getList = "https://api.trello.com/1/boards/"+ board +"/lists?key="+ paramTrello.key +"&token=" + paramTrello.token;
        httpGet(getList)
          .then(list => {
            let data = JSON.parse(list);
            return ctx.reply("Лови список!");
          })
      })
    }
});

app.use(menu.init());

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error);
});

app.launch();

// FUNCTION GET
function httpGet(url) {

  return new Promise(function(resolve, reject) {

    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
        console.log(this);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}