const express = require('express')
const router = express.Router()

module.exports = (feedbackService) => {

    router.get('/', async(req, res, next) => {
        try{
            const feedbacks = await feedbackService.getFeedbacks()
            if(feedbacks){
                res.status(200).json(feedbacks)
            }else{
                res.json({Info: 'no Feedbacks Found'})
            }
        }catch(err){
            console.log(`Failed to fetch all feedbacks\nError: ${err.message}`)
            return next(err)
        }
    })

    router.post('/', async(req, res, next) => {
        try{
            const {name, email, title, message} = req.body
            const feedback = await feedbackService.addFeedback(name, email, title, message)
            res.status(200).json({feedback: 'Added feedback successfully'})
        }catch(err){
            console.log(`Failed to create new feedback\nError: ${err.message}`)
            return next(err)
        }
    })

    return router;
}
