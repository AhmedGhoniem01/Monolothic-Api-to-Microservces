const {name, version} = require('../package.json')
const bunyan = require('bunyan')
const path = require('path')

const logger = (serviceName, serviceVersion, level) => bunyan.createLogger({name: `${serviceName}:${serviceVersion}`, level})

module.exports = {
    "development": {
        name,
        version,
        serviceTimeout: 30,
        data: {
            feedbacks: path.join(__dirname, '../data/feedback.json')
        },
        log : () => logger(name, version, "debug")
    },
    "testing": {
        name: name,
        version: version,
        serviceTimeout: 30,
        data: {
            feedbacks: path.join(__dirname, '../data/feedback.json')
        },
        log : () => logger(name, version, "fatal")
    },
    "production": {
        name: name,
        version: version,
        serviceTimeout: 100,
        data: {
            feedbacks: path.join(__dirname, '../data/feedback.json')
        },
        log : () => logger(name, version, "info")
    }
}