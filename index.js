// includes
const Telegraf = require('telegraf');

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
});

bot.on('text', ctx => ctx.reply('Ты пес'));

app.launch();