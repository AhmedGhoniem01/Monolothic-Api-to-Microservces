const express = require('express')
const router = express.Router()
const speakersRoute = require("./speaker");
const feedbackRoute = require("./feedback");

module.exports = (speakerService) => {
    router.get('/', async(req, res) => {
        try{

        }catch(err){
            Console.log(`Error: ${err.message}`)
            return next(err);
        }

    })

    router.get('/:shortname/artworks', async(req, res) => {
        try{

        }catch(err){
            Console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    router.get('/:shortname', async(req, res) => {
        try{
            
        }catch(err){
            Console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    return router;
}