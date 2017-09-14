import logger from '../logger'
import { pickOne, parseQuestion } from '../updateLeetcodeTable'

export default leetcodeTable => ({ message, ...ctx }) => {
  logger(JSON.stringify(message))
  const difficulty = (message.text.replace('/pickone', '')).toLowerCase()
  const pickedQuestion = pickOne(difficulty, leetcodeTable)
  logger(JSON.stringify(pickedQuestion))
  const {
    url,
    questionTitle,
    acceptRate,
  } = parseQuestion(pickedQuestion)
  ctx.reply(`連結：${url}
題目：${questionTitle}
通過率：${acceptRate}
難度：${difficulty}
  `)
}
