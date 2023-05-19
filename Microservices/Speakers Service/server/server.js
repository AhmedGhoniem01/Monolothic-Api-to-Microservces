const express = require('express')
const service = express()

const SpeakerService = require('./lib/speaker')

module.exports = (config) => {
    const log = config.log()
    const speakerService = new SpeakerService(config.data.speakers)

    //Print incoming request in dev mode
    service.use((req, res, next) => {
        if (service.get('env') == "development") {
            log.info(`${req.method}:${req.url}`)
        }
        next()
    })

    //get all speakers
    service.get('/speakers', async (req, res, next) => {
        try {
            const speakers = await speakerService.getSpeakers()
            if (speakers) {
                res.status(200).json(speakers)
            }
            res.json({ Info: 'No speakers found!' })
        } catch (err) {
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    //get all speakers' short names
    service.get('/speakers/shortnames', async (req, res, next) => {
        try {
            const speakers = await speakerService.getNames()
            if (speakers) {
                res.status(200).json(speakers)
            }
            res.json({ Info: 'No speakers found!' })
        } catch (err) {
            console.log(`Error: ${err.message}`)
            return next(err);
        }

    })

    // get a speaker by his shortname
    service.get('/speakers/:shortname', async (req, res, next) => {
        try {
            const { shortname } = req.params
            const speaker = await speakerService.getSpeaker(shortname)
            if (speaker) {
                res.status(200).json(speaker)
            } else {
                res.json({ Info: 'Speaker not found!' })
            }
        } catch (err) {
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    //get all artworks
    service.get('/artworks', async (req, res, next) => {
        try {
            const artworks = await speakerService.getAllArtworks()
            if (artworks) {
                res.status(200).json(artworks)
            }
            res.json({ Info: 'No artworks found!' })
        } catch (err) {
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    //get all artworks of a speaker
    service.get('/artworks/:shortname', async (req, res, next) => {
        try {
            const shortname = req.params.shortname
            const speaker = await speakerService.getSpeaker(shortname)
            if (speaker) {
                const artworks = await speakerService.getSpeakerArtworks(shortname)
                if (artworks) {
                    res.status(200).json(artworks)
                } else {
                    res.status(200).json({ Info: "Speaker doesn't have any artworks" })
                }
            }
            res.json({ Info: 'Speaker not found!' })
        } catch (err) {
            console.log(`Error: ${err.message}`)
            return next(err);
        }
    })

    service.use((error, req, res, next) => {
        log.error(`Error: ${error.message}`)
        res.status(500 || error.status).json({error: error.message})
    })
    
    return service;
}