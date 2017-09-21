import fetch from 'isomorphic-fetch'
import logger from '../logger'
import { WEBHOOK_URL } from '../config'

const sayHelloTo = (platform) => ({
  slack: fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ text: '喵！我回來了 :cat2::cat2::cat2:' }),
  }).then(() => {
    logger('Respond with meow')
  }),
})[platform]


export default sayHelloTo
