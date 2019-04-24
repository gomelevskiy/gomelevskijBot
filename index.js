const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

app.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  });
});

app.start((ctx) => ctx.reply('Welcome'));
app.command('test', (ctx) => ctx.reply('Test'));

app.on('text', (msg, match) => {

    var message = 'Привет ' + msg.chat.last_name + ' ' + msg.chat.first_name;
    app.reply(msg.chat.id, message);
});

app.launch();