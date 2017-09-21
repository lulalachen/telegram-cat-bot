import R from 'ramda'
import { Router } from 'express'
import fetch from 'isomorphic-fetch'
import makeSlackMessage from '../utils/makeSlackMessage'
import logger from '../logger'
import { getLeetcodeTable } from '../leetcodeTable'
import { pickOne, parseQuestion } from '../updateLeetcodeTable'
import { WEBHOOK_URL } from '../config'

const router = Router()

const postPickone = (req, res) => {
  const {
    text,
    user_name: userName = '',
  } = req.body
  const difficulty = R.pipe(
    R.match(/(easy|medium|hard)/),
    R.pathOr('easy', [0])
  )(text)

  const leetcodeTable = getLeetcodeTable()
  const pickedQuestion = pickOne(difficulty, leetcodeTable)

  const {
    url,
    questionTitle,
    acceptRate,
  } = parseQuestion(pickedQuestion)

  logger(`Replied with: ${questionTitle}, ${difficulty}`)

  const message = makeSlackMessage({
    url, questionTitle, acceptRate, difficulty, userName,
  })
  fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(message),
  }).then(() => {
    logger(`Respond with ${questionTitle} - ${url}`)
  })
  res.status(200).send()
}

const postMeow = (req, res) => {
  const { user_name: userName = '' } = req.body
  fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ text: `喵! <@${userName}> 你叫我？` }),
  }).then(() => {
    logger('Respond with meow')
  })
  res.status(200).send()
}

router.post('/meow', postMeow)
router.post('/pickone', postPickone)

export default router
