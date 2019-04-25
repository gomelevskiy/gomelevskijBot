// includes
const Telegraf = require('telegraf');
const TelegrafInlineMenu = require('telegraf-inline-menu');

// init app & menu
const app = new Telegraf(process.env.BOT_TOKEN);
const menu = new TelegrafInlineMenu(ctx => `Hey ${ctx.from.first_name}!`);

app.start((ctx) => ctx.reply("Welcome, " + ctx.message.from.last_name + " " + ctx.message.from.first_name));
app.command('test', (ctx) => ctx.reply('Test'));

// app.use((ctx) => ctx.reply(ctx.message.text + " сказал " + ctx.message.from.last_name + " " + ctx.message.from.first_name));

app.hears('hi', ctx => {

	let msg = '';
	msg = 'Сказал мне ' + ctx.message.text;

 return ctx.reply(msg);
});

app.command('go', ctx => {

	let msg = '';
	msg = 'Сказал мне ' + ctx.message.text;

 return ctx.reply(msg);
});


let welcomeTest = 'Привет 👋,\n Готов сыграть со мной в игру ❔❔❔';
menu.setCommand('menu');
menu.simpleButton('Да ✔️', 'a', {
  joinLastRow: true,
  doFunc: ctx => ctx.reply('👍')
});

menu.simpleButton('Нет ✖️', 'b', {
  joinLastRow: true,
  doFunc: ctx => ctx.reply('👎')
});

app.use(menu.init());

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.launch();