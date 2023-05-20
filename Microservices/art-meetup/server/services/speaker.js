const util = require('util')
const fs = require('fs')
const axios = require('axios')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class SpeakerService{
    constructor({serviceRegistryUrl, serviceVersion}){
        this.serviceRegistryUrl = serviceRegistryUrl
        this.serviceVersion = serviceVersion
        this.serviceName = 'speakers-service'
    }

    async getSpeakers(){
        const {ip, port} = await this.getService('speakers-service');
        return this.callService({
          method: 'get',
          url: `http://${ip}:${port}/speakers`
        });
    }

    async getNames(){
        const {ip, port} = await this.getService('speakers-service');
        return this.callService({
          method: 'get',
          url: `http://${ip}:${port}/speakers/shortnames`
        });
    }

    async getSpeaker(shortname){
        const {ip, port} = await this.getService('speakers-service');
        return this.callService({
          method: 'get',
          url: `http://${ip}:${port}/speakers/:shortname`
        });
    }

    async getSpeakerArtworks(shortname){
        const {ip, port} = await this.getService('speakers-service');
        return this.callService({
          method: 'get',
          url: `http://${ip}:${port}/artworks/:shortname`
        });
    }

    async getAllArtworks(){
        const {ip, port} = await this.getService('speakers-service');
        return this.callService({
          method: 'get',
          url: `http://${ip}:${port}/artworks`
        });
    }
    
    async getService(){
        const res = await axios.get(`${this.serviceRegistryUrl}/get/${this.serviceName}/${this.serviceVersion}`)
        return res.data
    }
}   

module.exports = SpeakerService;