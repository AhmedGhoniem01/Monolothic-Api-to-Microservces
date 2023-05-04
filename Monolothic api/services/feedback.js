const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class FeedbackService{
    constructor(dataFile){
        this.dataFile = dataFile
    }

    async getFeedbacks(){
        const data = await readFile(this.dataFile, 'utf-8')
        if(data)
            return JSON.parse(data)
        return []
    }

    async addFeedback(name, email, title, message){
        const newEntry = {name, email, title, message}
        const data = await this.getFeedbacks() 
        data.unshift(newEntry)
        await writeFile(this.dataFile,JSON.stringify(data))
    }
}

module.exports = FeedbackService;