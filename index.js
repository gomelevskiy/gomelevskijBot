const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

app.use((ctx, next) => {
  const start = new Date();
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log('Response time %sms', ms);
  });
});

app.on('start', (ctx) => ctx.reply('Welcome, my dear friend!'));
app.on('test', (ctx) => ctx.reply('Test me, please!'));
app.launch();