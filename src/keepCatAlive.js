import http from 'http'
import logger from './logger'

const {
  APP_NAME,
} = process.env
const APP_URL = `http://${APP_NAME}.herokuapp.com/`

const keepCatAlive = () => {
  // between 5 and 6 min prevent from hault
  setInterval(() => {
    logger(`Fetching... ${APP_URL}`)
    http.get(APP_URL, () => logger('I\'m alive meow'))
  }, (60000 * Math.random()) + (60000 * 5))
}

export default keepCatAlive
