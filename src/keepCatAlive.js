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

  // between 20 and 50 min prevent from hault
  setInterval(() => {
    http.get(NOW_URL.replace('https://', 'http://'), () => {
      console.log('I\'m alive meow')
    })
  }, (100000 * Math.random()) + 600000)
}

export default keepCatAlive
