const express = require('express')
const router = express.Router()

module.exports = (speakerService) => {
        
    router.get('/', async(req, res, next) => {
        try{
            const speakers = await speakerService.getSpeakers()
            if(speakers){
                res.status(200).json(speakers)
            }
            res.json({Info: 'No speakers found!'})
        }catch(err){
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })
    
    router.get('/names', async(req, res, next) => {
        try{
            const speakers = await speakerService.getNames()
            if(speakers){
                res.status(200).json(speakers)
            }
            res.json({Info: 'No speakers found!'})
        }catch(err){
            console.log(`Error: ${err.message}`)
            return next(err);
        }

    })

    router.get('/artworks', async(req, res, next) => {
        try{
            const artworks = await speakerService.getAllArtworks()
            if(artworks){
                res.status(200).json(artworks)
            }
            res.json({Info: 'No artworks found!'})
        }catch(err){
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    router.get('/artworks/:shortname', async(req, res, next) => {
        try{
            const shortname = req.params.shortname
            const speaker = await speakerService.getSpeaker(shortname)
            if(speaker){
                const artworks = await speakerService.getSpeakerArtworks(shortname)
                if(artworks){
                    res.status(200).json(artworks)
                }else{
                    res.status(200).json({Info: "Speaker doesn't have any artworks"})
                }
            }
            res.json({Info: 'Speaker not found!'})
        }catch(err){
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    router.get('/:shortname', async(req, res, next) => {
        try{
            const {shortname} = req.params
            const speaker = await speakerService.getSpeaker(shortname)
            if(speaker){
                res.status(200).json(speaker)
            }else{
                res.json({Info: 'Speaker not found!'})
            }
        }catch(err){
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    return router;
}