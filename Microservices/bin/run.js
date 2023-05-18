require('dotenv').config()
let port = process.env.PORT
let env = process.env.NODE_ENV  

const http = require('http')
const config = require('../config/config')[env || "development"]
const service = require('../server/server')(config)
const log = config.log()


let server = http.createServer(service)

server.listen(port || 8000)

server.on('listening', () => {
    log.info(`Server listening on port ${port}`)
})