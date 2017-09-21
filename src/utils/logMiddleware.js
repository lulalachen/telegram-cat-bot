import logger from '../logger'

export default (req, res, next) => {
  logger(JSON.stringify(req.body))
  next()
}
