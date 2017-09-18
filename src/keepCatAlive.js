import http from 'http'

const {
  APP_NAME,
  PORT = 3000,
} = process.env

const keepCatAlive = () => {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('I\'m an alive cat.')
  }).listen(PORT)

  // between 5 and 6 min prevent from hault
  setInterval(() => {
    http.get(`http://${APP_NAME}.herokuapp.com/`, () => {
      console.log('I\'m alive meow')
    })
  }, (60000 * Math.random()) + (60000 * 5))
}

export default keepCatAlive
