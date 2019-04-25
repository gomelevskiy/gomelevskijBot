// includes
const Telegraf = require('telegraf');
const TelegrafInlineMenu = require('telegraf-inline-menu');
const menu = new TelegrafInlineMenu(ctx => `Hey ${ctx.from.first_name}!`)
// init my telegram
const app = new Telegraf(process.env.BOT_TOKEN);

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
	menu.simpleButton('I am excited!', 'a', {
	  doFunc: ctx => ctx.reply('As am I!')
	});
	app.use(menu.init());
	app.startPolling();
});

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.launch();