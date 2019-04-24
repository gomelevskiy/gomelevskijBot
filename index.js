const Telegraf = require('telegraf');

const app = new Telegraf('BOT_TOKEN=899741222:AAFV4NVV9B13QgG6quUuk0T1HI-jA1LYQh0', {
  telegram: { agent: socksAgent }
});

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