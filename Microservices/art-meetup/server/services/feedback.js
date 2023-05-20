const util = require('util')
const fs = require('fs')
const axios = require('axios')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

class FeedbackService {
    constructor({ serviceRegistryUrl, serviceVersion }) {
        this.serviceRegistryUrl = serviceRegistryUrl
        this.serviceVersion = serviceVersion
        this.serviceName = 'feedback-service'
    }

    async getFeedbacks() {
        const { ip, port } = await this.getService('feedback-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/feedback`
        });
    }

    async addFeedback(name, email, title, message) {
        const { ip, port } = await this.getService('speakers-service');
        return this.callService({
            method: 'get',
            url: `http://${ip}:${port}/feedback`
        });
    }

    async getService() {
        const res = await axios.get(`${this.serviceRegistryUrl}/get/${this.serviceName}/${this.serviceVersion}`)
        return res.data
    }

    async callService(reqOptions) {
        const servicePath = url.parse(reqOptions.url).path;

        return result;
    }
}

module.exports = FeedbackService;