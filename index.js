const {readFileSync} = require('fs')

const Telegraf = require('telegraf')
const session = require('telegraf/session')

const TelegrafInlineMenu = require('telegraf-inline-menu')

const menu = new TelegrafInlineMenu('Main Menu')

let mainMenuToggle = false
// menu.toggle('toggle me', 'a', {
//   setFunc: (_ctx, newVal) => {
//     mainMenuToggle = newVal
//   },
//   isSetFunc: () => mainMenuToggle
// })

const foodMenu = new TelegrafInlineMenu('Тут было меню с едой')

const people = {Mark: {}, Paul: {}}
const food = ['хлеб', 'пирог', 'бананы']

function personButtonText(_ctx, key) {
  const entry = people[key]
  if (!entry || !entry.food) {
    return key
  }

  return `${key} (${entry.food})`
}

function foodSelectText(ctx) {
  const person = ctx.match[1]
  const hisChoice = people[person].food
  if (!hisChoice) {
    return `${person} тут текст что он выбрал подставляется`
  }

  return `${person} любит ${hisChoice} этот выбор, это для текста, а не кнопка.`
}

const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
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

foodMenu.selectSubmenu('p', () => Object.keys(people), foodSelectSubmenu, {
  textFunc: personButtonText,
  columns: 2
})

foodMenu.question('Добавить список', 'add', {
  questionText: 'Хотите добавить новый список в Trello?',
  setFunc: (_ctx, key) => {
    people[key] = {}
  }
})

menu.submenu('Блюда', 'food', foodMenu, {
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