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

app.use((ctx) => ctx.reply(ctx.message + " сказал Петух"));

app.launch();