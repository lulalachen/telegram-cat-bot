import http from 'http'

const {
  NOW_URL,
  PORT = 3000,
} = process.env

const keepCatAlive = () => {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('')
  }).listen(PORT)

  // between 5 and 6 min prevent from hault
  setInterval(() => {
    http.get('https', () => {
      console.log('I\'m alive meow')
    })
  }, (60000 * Math.random()) + (60000 * 5))
}

export default keepCatAlive
