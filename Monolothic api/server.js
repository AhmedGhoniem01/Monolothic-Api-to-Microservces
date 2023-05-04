const express = require('express')
const app = express()
const port = 3000
const SpeakerService = require('./services/speaker')
const FeedbackService = require('./services/feedback')
const routes = require('./routes')

//Handle views engine if used
// app.set('view-engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

//Handle static files if used
// app.use(express.static(path.join(__dirname, 'static')))

//Handling request body and json data
app.use(express.urlencoded({extended: true})) 
app.use(express.json())

//Creating new services instances to be injected into routes
const speakerService = new SpeakerService('./data/speakers.json')
const feedbackService = new FeedbackService('./data/feedback.json')

//Using routes
app.use('/', routes({speakerService, feedbackService}))

//App listening on port
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
