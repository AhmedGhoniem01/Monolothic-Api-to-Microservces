const {name, version} = require('../package.json')
const bunyan = require('bunyan')

const logger = (serviceName, serviceVersion, level) => bunyan.createLogger({name: `${serviceName}:${serviceVersion}`, level})

module.exports = {
    "development": {
        "name": name,
        "version": version,
        "serviceTimeout": 30,
        log : () => logger(name, version, "debug")
    },
    "testing": {
        "name": name,
        "version": version,
        "serviceTimeout": 30,
        log : () => logger(name, version, "fatal")
    },
    "production": {
        "name": name,
        "version": version,
        "serviceTimeout": 100,
        log : () => logger(name, version, "info")
    }
}