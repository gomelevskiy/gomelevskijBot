const Telegraf = require('telegraf');
const app = new Telegraf('899741222:AAFV4NVV9B13QgG6quUuk0T1HI-jA1LYQh0');

app.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  });
});

app.on('text', (ctx) => ctx.reply('Hello '));
app.command('test', (ctx) => ctx.reply('Test');
app.launch();

let port = process.env.Port || 8000;
server.listen(port, function() {
    console.log('App us running on port ' + port);
});