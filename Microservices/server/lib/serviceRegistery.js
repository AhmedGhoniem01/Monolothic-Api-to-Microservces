require('dotenv').config()

const config = require('../../config/config')[process.env.NODE_ENV || "development"]
const log = config.log()
const timeout = config.timeout

class ServiceRegistery {
    constructor() {
        this.services = {}
        this.timeout = timeout
        this.log = log 
    }

    registerService(serviceName, serviceVersion, serviceIP, servicePort){
        const serviceID = `${serviceName}:${serviceVersion}/${serviceIP}/${servicePort}`

        if (!this.services[serviceID]){
            const service = {
                Name: serviceName,
                Version: serviceVersion,
                IP: serviceIP,
                Port: servicePort,
                timestamp: new Date().toLocaleString()
            }
            this.services[serviceID] = service
            this.log.debug(`Added new Microservice: ${serviceID}`)
            return serviceID
        }
        this.services[serviceID].serviceName = serviceName
        this.services[serviceID].serviceVersion = serviceVersion
        this.services[serviceID].serviceIP = serviceIP
        this.services[serviceID].servicePort = servicePort
        this.services[serviceID].timestamp = new Date().toLocaleString()
        this.log.debug(`Updated Microservice: ${serviceID}`)

        return serviceID
    }

    unRegisterService(serviceName, serviceVersion, serviceIP, servicePort){
        const serviceID = `${serviceName}:${serviceVersion}/${serviceIP}/${servicePort}`

        if (!this.services[serviceID]){
            this.log.debug(`Microservice: ${serviceID} Not found!`)
            return null
        }
        delete this.services[serviceID]
        this.log.debug(`Deleted Microservice: ${serviceID}`)
        return serviceID
    }

}

module.exports = ServiceRegistery