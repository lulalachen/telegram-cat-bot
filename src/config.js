import fs from 'fs'
import dotenv from 'dotenv'
import logger from './logger'

if (fs.existsSync('./.env')) {
  logger('Loading env from .env')
  dotenv.load()
}

export const BOT_TOKEN = process.env.BOT_TOKEN
export const APP_NAME = process.env.APP_NAME || 'telegram-cat-bot'
export const WEBHOOK_URL = process.env.WEBHOOK_URL
