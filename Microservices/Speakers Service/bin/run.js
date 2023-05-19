require('dotenv').config()
let env = process.env.NODE_ENV

const axios = require('axios')

const http = require('http')
const config = require('../config/config')[env || "development"]
const log = config.log()
const service = require('../server/server')(config)

let server = http.createServer(service)

//Assign random port to the service
server.listen(0)

//Register and unregister functions
const registerService = () => axios.put(`http://localhost:8000/register/${config.name}/${config.version}/${server.address.port}`)
const unregisterservice = () => axios.delete(`http://localhost:8000/unregister/${config.name}/${config.version}`)

//Register function upon laod up
registerService()

//register function each interavl
const registerInterval = setInterval(registerService, 1000 * 20)

//Cleanup util function
const cleanup = async () => {
    clearInterval(registerInterval)
    await unregisterservice()
}

//Server listening on port
server.on('listening', () => {
    log.info(`Server listening on port ${port}`)
})

//Handling service exit 
process.on('uncaughtException', async () => {
    await cleanup();
    process.exit(0);
});

process.on('SIGINT', async () => {
    await cleanup();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await cleanup();
    process.exit(0);
});