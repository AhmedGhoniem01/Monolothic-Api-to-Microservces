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
                timestamp: Math.floor(new Date() / 1000)
            }
            this.services[serviceID] = service
            this.log.debug(`Added new Microservice: ${serviceID}`)
            return serviceID
        }
        this.services[serviceID].Name = serviceName
        this.services[serviceID].Version = serviceVersion
        this.services[serviceID].IP = serviceIP
        this.services[serviceID].Port = servicePort
        this.services[serviceID].timestamp = Math.floor(new Date() / 1000)
        this.log.debug(`Updated Microservice: ${serviceID}`)

        return serviceID
    }

    getService(serviceName, serviceVersion){
        const serviceList = Object.values(this.services).filter((service) => (service.Name == serviceName) && (parseInt(service.Version)-parseInt(serviceVersion)<1))
        //Load balance returned services by random 
        return serviceList[Math.floor(Math.random() * serviceList.length)]
    }

    cleanUp(){
        Object.keys(this.services).forEach((serviceID) => {
            console.log(serviceID)
            //Must use this date format for addition operation in cleanup
            const now = Math.floor(new Date() / 1000)
            if(this.services[serviceID].timestamp + this.timeout < now){
                delete this.services[serviceID]
                this.log.debug(`Microservice: ${serviceID} Timed-out`)
            }
        })
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