const {readFileSync} = require('fs')

const Telegraf = require('telegraf')
const session = require('telegraf/session')
const paramTrello = {
  page: "AvJmy7iN",
  key: "af5c385fa0bbcca4ef1d6c0692a95531",
  token: "2213c6ce8516841f60b276fe1c4431096b7b9333bcede41f05a791f98b90e5d9"
};

const TelegrafInlineMenu = require('telegraf-inline-menu')

const menu = new TelegrafInlineMenu(ctx => `Привет, ${ctx.from.first_name} 👋\nЧто тебе нужно?`)

let mainMenuToggle = false
// menu.toggle('toggle me', 'a', {
//   setFunc: (_ctx, newVal) => {
//     mainMenuToggle = newVal
//   },
//   isSetFunc: () => mainMenuToggle
// })
// инициализация меню списков
const trelloMenu = new TelegrafInlineMenu('Текущие списки Trello')
// переменные

getListTrello(paramTrello.page,paramTrello.key,paramTrello.token);

const people = {}
const food = ['хлеб', 'пирог', 'бананы']

// функция кнопок людей, нужно переделать на списки трелло
function personButtonText(_ctx, key) {
  const entry = people[key]
  if (!entry || !entry.food) {
    return key
  }

  return `${key} (${entry.food})`
}

// добавил функцию получения списков
function getListTrello(page,key,token) {
  let url = '';
  url = "https://api.trello.com/1/boards/"+ page +"?fields=all&key="+ key +"&token=" + token;

  // get lists
  httpGet(url)
    .then(response => {
      return response.id;
    })

    .then(board => {
      // lists arr
      let getList = "https://api.trello.com/1/boards/"+ board +"/lists?key="+ key +"&token=" + token;
      httpGet(getList)
        .then(list => {
          for( var i = 0; i < list.length; i++ ) {
            people[data[i].name] = {};
          }
        })
    })
}

// функция когда уже выбраликонкретный список (человека)
function trelloSelectText(ctx) {
  const person = ctx.match[1]
  const hisChoice = people[person].food
  if (!hisChoice) {
    return `${person} тут текст что он выбрал подставляется`
  }

  return `${person} любит ${hisChoice} этот выбор, это для текста, а не кнопка.`
}

// кнопка на выбрать не выбрать, ставит иконку в своем поинте
const trelloSelectSubmenu = new TelegrafInlineMenu(trelloSelectText)
  .toggle('Тугл выбрать не выбрать', 't', {
    setFunc: (ctx, choice) => {
      const person = ctx.match[1]
      people[person].tee = choice
    },
    isSetFunc: ctx => {
      const person = ctx.match[1]
      return people[person].tee === true
    }
  })
  .select('f', food, {
    setFunc: (ctx, key) => {
      const person = ctx.match[1]
      people[person].food = key
    },
    isSetFunc: (ctx, key) => {
      const person = ctx.match[1]
      return people[person].food === key
    }
  })

// создает меню с выбором списком и остальными пунктами, типа вернуться на главную
trelloMenu.selectSubmenu('p', () => Object.keys(people), trelloSelectSubmenu, {
  textFunc: personButtonText,
  columns: 2
})

// создает блок создания нового списка, добавляет в массив
trelloMenu.question('Добавить список', 'add', {
  questionText: 'Хотите добавить новый список в Trello?',
  setFunc: (_ctx, key) => {
    people[key] = {}
  }
})

// кнопка инициализации, 1 шаг начальный, закрывает основное меню и открывает меню со списками
menu.submenu('Получить списки Trello', 'food', trelloMenu, {
  hide: () => mainMenuToggle
})

// let isAndroid = true
// menu.submenu('Photo Menu', 'photo', new TelegrafInlineMenu('', {
//   photo: () => isAndroid ? 'https://telegram.org/img/SiteAndroid.jpg' : 'https://telegram.org/img/SiteiOs.jpg'
// }))
//   .setCommand('photo')
//   .simpleButton('Just a button', 'a', {
//     doFunc: async ctx => ctx.answerCbQuery('Just a callback query answer')
//   })
//   .select('img', ['iOS', 'Android'], {
//     isSetFunc: (_ctx, key) => key === 'Android' ? isAndroid : !isAndroid,
//     setFunc: (_ctx, key) => {
//       isAndroid = key === 'Android'
//     }
//   })

menu.setCommand('start')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session())

bot.use((ctx, next) => {
  if (ctx.callbackQuery) {
    console.log('хз что это', ctx.callbackQuery.data.length, ctx.callbackQuery.data)
  }

  return next()
})

bot.use(menu.init({
  backButtonText: 'Вернуться назад',
  mainMenuButtonText: 'назад к главному меню'
}))

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
})

bot.startPolling()

// FUNCTION GET
function httpGet(url) {

  return new Promise(function(resolve, reject) {
    var req = unirest("GET", url);
    req.headers({
      "cache-control": "no-cache"
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      resolve(res.body);
    });
  });
}