import http from 'http'

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('')
}).listen(process.env.PORT || 5000)

// between 20 and 50 min prevent from hault
setInterval(() => {
  http.get(`http://${APP_NAME}.herokuapp.com/`, () => {})
}, (600000 * Math.random()) + 600000)
