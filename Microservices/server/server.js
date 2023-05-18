const express = require("express")
const service = express()

const ServiceRegistery = require('./lib/serviceRegistery')

module.exports = (config) => {
    const log = config.log()
    const serviceRegistery = new ServiceRegistery()

    if(service.get('env') == "development"){
        service.use((req, res, next) => {
            log.info(`${req.method}:${req.url}`)
            next()
        })
    }

    service.put('/register/:serviceName/:serviceVersion/:servicePort/', (req, res) => {
        try{
            const {serviceName, serviceVersion, servicePort} = req.params;
            const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
            const serviceID = serviceRegistery.registerService(serviceName, serviceVersion, serviceIP, servicePort);
            return res.status(200).json({Message: "Register successful", Result: serviceID}) 
        }catch(err){
            console.log(`Internal server error: ${err.message}`)
            return res.status(err.status || 500).json({Error: err.message})
        }   
    })

    service.delete('/unregister/:serviceName/:serviceVersion/:servicePort/', (req, res, next) => {
        try{
            const {serviceName, serviceVersion, servicePort} = req.params;
            const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
            const serviceID = serviceRegistery.unRegisterService(serviceName, serviceVersion, serviceIP, servicePort);
            if(serviceID){
                return res.status(200).json({Message: "Deletion successful", Result: serviceID}) 
            }
            return res.status(404).json({Message: "Service Not found", Result: serviceID}) 
        }catch(err){
            console.log(`Internal server error: ${err.message}`)
            return res.status(err.status || 500).json({Error: err.message})
        }     
    })

    service.get('/register/:serviceName/:serviceVersion/:servicePort/', (req, res, next) => {
        return next()
    })

    service.use((error, req, res, next) => {
        log.error(`Error: ${error.message}`)
        res.status(500 || error.status).json({error: error.message})
    })

    return service
}