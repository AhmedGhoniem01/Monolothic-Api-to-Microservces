const express = require('express')
const service = express()

const { validationArr } = require('./lib/validator')
const { validationResult } = require('express-validator')
const cookieSession = require('cookie-session')

const FeedbackService = require('./lib/feedback')

module.exports = (config) => {
    const log = config.log()
    const feedbackService = new FeedbackService(config.data.feedbacks)

    service.use(express.urlencoded({ extended: true }))
    service.use(express.json())

    service.use(
        cookieSession({
            name: 'session',
            keys: ['FGD456d45fgh', 'GR64dh654h']
        })
    )

    //Print incoming request in dev mode
    service.use((req, res, next) => {
        if (service.get('env') == "development") {
            log.info(`${req.method}:${req.url}`)
        }
        next()
    })

    service.get('/feedback', async (req, res, next) => {
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

    service.post('/feedback', validationArr, async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                req.session.feedback = {
                    errors: errors.array()
                }
                return res.redirect('/feedback') //Required return
            }

            const { name, email, title, message } = req.body
            await feedbackService.addFeedback(name, email, title, message)
            req.session.feedback = {
                message: 'Added Feedback Successfully'
            }
            return res.status(200).redirect('/feedback')
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
