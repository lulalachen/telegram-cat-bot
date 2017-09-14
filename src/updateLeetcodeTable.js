import R from 'ramda'
import fetch from 'isomorphic-fetch'
import logger from './logger'

export default function updateLeetcodeTable() {
  logger('Start updating')
  return fetch('https://leetcode.com/api/problems/algorithms/')
  .then(response => response.json())
  .then(jsonData => {
    const questions = jsonData.stat_status_pairs
    logger(`Leetcode table constructed: number of problems is ${R.length(questions)}`)
    return questions
  })
  .catch(e => logger(e))
}

const getDifficulty = (levelText) => ({
  easy: 1,
  medium: 2,
  hard: 3,
})[levelText]

export const pickOne = (levelText = 'easy', leetcodeTable) => {
  console.log(levelText)
  const level = R.ifElse(
    R.flip(R.contains)(['easy', 'medium', 'hard']),
    getDifficulty,
    R.always('easy')
  )(levelText)

  const availableQuestions = R.filter(
    R.and(
      R.propEq('paid_only', false),
      R.pathEq(['difficulty', 'level'], level)
    ))(leetcodeTable)
  const length = R.length(availableQuestions)
  const randomIndex = Math.floor(Math.random() * (length - 1))
  // logger(JSON.stringify(availableQuestions[randomIndex]))
  return availableQuestions[randomIndex]
}

export const parseQuestion = (question) => {
  const baseUrl = 'https://leetcode.com/problems/'
  const url = `${baseUrl}${R.path(['stat', 'question__title_slug'], question)}`
  const questionTitle = R.path(['stat', 'question__title'], question)
  const accept = R.path(['stat', 'total_acs'], question)
  const submit = R.path(['stat', 'total_submitted'], question)
  const acceptRate = `${Math.round((accept / submit) * 10000) / 100}% (${accept}/${submit})`
  return {
    url,
    questionTitle,
    acceptRate,
  }
}
