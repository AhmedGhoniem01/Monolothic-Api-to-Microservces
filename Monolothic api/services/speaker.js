const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class SpeakerService{
    constructor(dataFile){
        this.dataFile = dataFile
    }

    async getSpeakers(){
        const data = await readFile(this.dataFile, 'utf-8')
        if(data)
            return JSON.parse(data)
        return []
    }

    async getNames(){
        const data = await this.getSpeakers()
        if(data)
            return data.map(speaker => {
                return {name: speaker.name, shortname: speaker.shortName}
            })
        return []
    }

    async getSpeaker(shortname){
        const data = await this.getSpeakers()

        const speaker = data.find(speaker => {
            return speaker.shortname = shortname
        })

        if(!speaker) return null
        return speaker
    }

    async getSpeakerArtworks(shortname){
        const data = await this.getSpeakers()

        const speaker = data.find(speaker => {
            return speaker.shortname = shortname
        })

        if(!speaker || !speaker.artwork) return null
        return speaker.artwork
    }

    async getAllArtworks(){
        const data = await this.getSpeakers()
        const artworks = data.map(speaker => {
            if(speaker.artwork){
                return {speaker: speaker.shortname, artwork: speaker.artwork}
            }
        })
        retrun (artworks || null)
    }
}   