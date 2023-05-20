const express = require('express')
const service = express()

const {validationArr} = require('./lib/validator')
const {validationResult} = require('express-validator')

const FeedbackService = require('./lib/feedback')

module.exports = (config) => {
    const log = config.log()
    const feedbackService = new FeedbackService(config.data.feedbacks)

    //Print incoming request in dev mode
    service.use((req, res, next) => {
        if (service.get('env') == "development") {
            log.info(`${req.method}:${req.url}`)
        }
        next()
    })

    service.get('/', async (req, res, next) => {
        try {
            const feedbacks = await feedbackService.getFeedbacks()

            // const errors = req.session.feedback ? req.session.feedback.errors : false
            // const successMessage = req.session.feedback ?  req.session.feedback.message : false
            const result = req.session.feedback.errors ? req.session.feedback.errors : req.session.feedback.message
            req.session.feedback = {}

            if (feedbacks) {
                res.status(200).json({ feedbacks, Result: result })
            } else {
                res.json({ Info: 'no Feedbacks Found', Result: result })
            }
        } catch (err) {
            console.log(`Failed to fetch all feedbacks\nError: ${err.message}`)
            return next(err)
        }
    })

    service.post('/', validationArr, async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                req.session.feedback = {
                    errors: errors.array()
                }
                res.redirect('/feedback')
            }

            const { name, email, title, message } = req.body
            await feedbackService.addFeedback(name, email, title, message)
            req.session.feedback = {
                message: 'Added Feedback Successfully'
            }

            res.status(200).redirect('/feedback')
        } catch (err) {
            console.log(`Failed to create new feedback\nError: ${err.message}`)
            return next(err)
        }
    })

    service.use((error, req, res, next) => {
        log.error(`Error: ${error.message}`)
        return res.status(500 || error.status).json({ error: error.message })
    })

    return service;
}
