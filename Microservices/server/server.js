const express = require("express")
const service = express()

module.exports = (config) => {
    const log = config.log()

    if(service.get('env') == "development"){
        service.use((req, res, next) => {
            log.info(`${req.method}:${req.url}`)
            next()
        })
    }

    service.use((error, req, res, next) => {
        log.error(`Error: ${error.message}`)
        res.status(500 || error.status).json({error: error.message})
    })

    return service
    
}