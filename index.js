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

// проверяем чат и если введена команда "/start", выводим сообщение
app.onText(/\/hello/, (msg, match) => {
    // Составляем сообщение, которое будет содержать имя и фамилию того,
    // кто взаимодействует с ботом
    var message = 'Привет ' + msg.chat.last_name + ' ' + msg.chat.first_name;

    // отсылаем сообщение, первым параметром передавая id чата,
    // а вторым уже само сообщение
    app.sendMessage(msg.chat.id, message);
});

app.launch();