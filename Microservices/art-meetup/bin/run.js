require('dotenv').config()
const env = process.env.NODE_ENV

const http = require("http")
const config = require('../config/config')[env || "development"]

const service = require('../server/server')

const server = http.createServer(service)

server.listen(0)

server.on('listening', () => {
    log.info(`Server is running on port ${server.address().port}`)
})
