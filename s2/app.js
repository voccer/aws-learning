const http = require('http') // Import Node.js core module
const interfaces = require('os').networkInterfaces();

const HOST = "0.0.0.0"
const PORT = 3000

const server = http.createServer(async function (req, res) {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(`AUTH::${getIPAddress()}`)
    } else if (req.url === '/auth') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('get auth')
    }
  } catch (e) {
    console.log(e)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ mess: e }))
    res.end()
  }
})

server.listen((port = PORT), (host = HOST))

console.log(`Node.js web server ${HOST}:${PORT} is running..`)


function getIPAddress() {
  for (let devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}