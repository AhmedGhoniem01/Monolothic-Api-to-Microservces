const express = require('express')
const router = express.Router()
const {validationArr} = require('../utils/validator')
const {validationResult} = require('express-validator')

module.exports = (feedbackService) => {
    router.get('/', async(req, res, next) => {
        try{
            const feedbacks = await feedbackService.getFeedbacks()

            // const errors = req.session.feedback ? req.session.feedback.errors : false
            // const successMessage = req.session.feedback ?  req.session.feedback.message : false
            const result = req.session.feedback.errors ? req.session.feedback.errors : req.session.feedback.message
            req.session.feedback = {}

            if(feedbacks){
                res.status(200).json({feedbacks, Result: result})
            }else{
                res.json({Info: 'no Feedbacks Found', Result: result})
            }
        }catch(err){
            console.log(`Failed to fetch all feedbacks\nError: ${err.message}`)
            return next(err)
        }
    })

    router.post('/' ,validationArr, async(req, res, next) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                req.session.feedback = {
                    errors: errors.array()
                } 
                res.redirect('/feedback')
            }
            
            const {name, email, title, message} = req.body
            await feedbackService.addFeedback(name, email, title, message)
            req.session.feedback = {
                message: 'Added Feedback Successfully'
            }

            res.status(200).redirect('/feedback')
        }catch(err){
            console.log(`Failed to create new feedback\nError: ${err.message}`)
            return next(err)
        }
    })

    return router;
}
