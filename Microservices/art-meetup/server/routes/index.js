const express = require('express')
const router = express.Router()
const speakersRoute = require("./speaker");
const feedbackRoute = require("./feedback");

module.exports = (params) => {
    const {speakerService, feedbackService} = params
    router.use('/speakers', speakersRoute(speakerService))
    router.use('/feedback', feedbackRoute(feedbackService))
    
    router.get('/', (req, res) => {
        res.status(200).json({Response: 'Index route'})
    })


    return router;
}