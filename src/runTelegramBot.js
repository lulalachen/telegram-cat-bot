import Telegraf from 'telegraf'
import R from 'ramda'
import logger from './logger'
import { pickOne, parseQuestion } from './updateLeetcodeTable'
import { BOT_TOKEN, APP_NAME } from './config'
import leetcodeTable from './leetcodeTable'

if (!BOT_TOKEN) throw Error('Missing bot token')
if (!APP_NAME) throw Error('Missing app name')

export default () => {
  const telegramApp = new Telegraf(BOT_TOKEN, { username: 'cena_cat_bot' })

  telegramApp.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Meow I\'m cena cat!')
  })
  telegramApp.command('meow', ({ reply, message: { from: {
    first_name: firstName = '奴才',
    last_name: lastName = '',
  } } }) => reply(`喵！${firstName} ${lastName}你叫我？`))
  telegramApp.hears(/(hello)|(hi)/g, (ctx) => ctx.reply('Hey there!'))
  telegramApp.command('pickone', ({ message, ...ctx }) => {
    logger(JSON.stringify(message))
    const [command, ...argvs] = message.text.split(' ')
    logger(command, argvs)
    const difficulty = (R.pathOr('Easy', [0], argvs)).toLowerCase()
    const pickedQuestion = pickOne(difficulty, leetcodeTable)
    const {
      url,
      questionTitle,
      acceptRate,
    } = parseQuestion(pickedQuestion)
    logger(`Replied with: ${questionTitle}, ${difficulty}`)
    ctx.reply(` 連結：${url}
題目：${questionTitle}
通過率：${acceptRate}
難度：${difficulty}
    `)
  })
  telegramApp.on('sticker', (ctx) => ctx.reply('👍'))
  telegramApp.startPolling()
}
