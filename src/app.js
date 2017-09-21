import express from 'express'
import bodyParser from 'body-parser'
import logger from './logger'
import apis from './apis'
import { initTable } from './leetcodeTable'
import runTelegramBot from './runTelegramBot'
import keepCatAlive from './keepCatAlive'

const { PORT = 3000 } = process.env
const app = express()
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`
⚡ 🚀  Web Server Start  🚀 ⚡

⚡  NODE_ENV=${process.env.NODE_ENV}
⚡  Web Server runs on http://localhost:${PORT}
`)
})

app.use(bodyParser.json())
app.use(apis)

initTable()
.then(() => {
  logger('Leetcode table inited.')
  keepCatAlive()
  runTelegramBot()
})
.catch(logger)
