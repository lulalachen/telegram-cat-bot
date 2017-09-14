import D from 'date-fp'
import chalk from 'chalk'

const logger = (...textArgs) => {
  const date = D.format('YYYY-MM-DD hh:mm:ss', new Date())
  console.log(`${chalk.gray(`[${date}]`)} - ${textArgs.join(' ')}`)
}
export default logger
