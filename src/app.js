import fs from 'fs'
import R from 'ramda'
import http from 'http'
import dotenv from 'dotenv'
import Telegraf from 'telegraf'
import logger from './logger'
import updateLeetcodeTable, { pickOne, parseQuestion } from './updateLeetcodeTable'

if (fs.existsSync('./.env')) {
  logger('Loading env from .env')
  dotenv.load()
}

// const s = new Sandbox()

const { BOT_TOKEN, APP_NAME = 'pickonebot' } = process.env
if (!BOT_TOKEN) throw Error('Missing bot token')
if (!APP_NAME) throw Error('Missing app name')

updateLeetcodeTable().then((leetcodeTable) => {
  logger(BOT_TOKEN)
  const app = new Telegraf(BOT_TOKEN, { username: 'cena_cat_bot' })

  app.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Meow I\'m cena cat!')
  })
  app.command('meow', ({ reply, message: { from: {
    first_name: firstName = '奴才',
    last_name: lastName = '',
  } } }) => reply(`喵！${lastName}${firstName}你叫我？`))
  app.hears(/(hello)|(hi)/g, (ctx) => ctx.reply('Hey there!'))
  app.command('pickone', ({ message, ...ctx }) => {
    logger(JSON.stringify(message))
    const [command, ...argvs] = message.text.split(' ')
    const difficulty = (R.pathOr('Easy', [0], argvs)).toLowerCase()
    const pickedQuestion = pickOne(difficulty, leetcodeTable)
    const {
      url,
      questionTitle,
      acceptRate,
    } = parseQuestion(pickedQuestion)
    ctx.reply(` 連結：${url}
題目：${questionTitle}
通過率：${acceptRate}
難度：${difficulty}
    `)
  })
  app.on('sticker', (ctx) => ctx.reply('👍'))
  app.startPolling()
})

http.createServer((req, res) => {
  res.write('This is meow')
  res.end()
}).listen(process.env.PORT || 3000)
