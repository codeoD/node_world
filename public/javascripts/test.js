const http = require('http')

const server = http.createServer((req, res) => {
    console.log('---' + req.url)
})

server.on('error', (err) => console.log(err))

server.on('request', (req, res) => {
    res.end(req.url)
    // console.log(req)
})

// http.request('http://localhost:8001/test', (res) => {
//     res.end('test ha ha')
// })


server.listen(8001)