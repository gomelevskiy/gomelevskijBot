// includes
const Telegraf = require('telegraf');
const TelegrafInlineMenu = require('telegraf-inline-menu');

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

let questions = [
	{
		title: "В каком городе Индии расположен мавзолей-мечеть Тадж-Махал?",
		options: ['Агра','Мубаи','Дели'],
		answer: '1'
	},
	{
		title: "Какой город является столицей США?",
		options: ['Нью-Йорк','Вашингтон','Бостон'],
		answer: '2'
	},
	{
		title: "В какой европейской стране находится город Бремен?",
		options: ['Франция','Италия','Германия','Испания'],
		answer: '3'
	}
];

const menu = new TelegrafInlineMenu(ctx => `Привет, ${ctx.from.first_name} 👋\nГотов сыграть со мной в игру ❔`);
menu.setCommand('menu');
menu.simpleButton('Да ✅', 'a', {
  joinLastRow: true,
  doFunc: ctx => {
  	if( mainMenuToggle == false ) {
	  	mainMenuToggle = true;
	  	ctx.reply(questions);
  	}
  }
});

menu.simpleButton('Нет ❌', 'b', {
  joinLastRow: true,
  doFunc: ctx => {
  	if( mainMenuToggle == false ) {
			mainMenuToggle = true;
	  	ctx.reply('Не правильный выбор 👎');
  	}
  }
});

app.use(menu.init());

app.on('message', ctx => ctx.reply('Ты пёс!'));

app.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error);
});

app.launch();