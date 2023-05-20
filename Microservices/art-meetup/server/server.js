const express = require('express')
const app = express()
const port = 3000

const createError = require("http-errors");
const cookieSession = require('cookie-session')

const SpeakerService = require('../server/services/speaker')
const FeedbackService = require('../server/services/feedback')

require('dotenv').config()
let env = process.env.NODE_ENV  

const routes = require('./routes');
const config = require('../config/config')[env || "development"]

//Handle views engine if used
// app.set('view-engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

//Handle static files if used
// app.use(express.static(path.join(__dirname, 'static')))

//This is a static global variable that can be used in templates
// app.locals.name = 'App'

//global req variables [This can specifically can be used if we want to fetch data with each request and that data periodically changes]
// app.use(async(req, res, next) => {
//     try{
//         const speakerNames = await speakerService.getNames();
//         app.locals.speakerNames = speakerNames;
//         return next();
//     }catch(err){
//         return next(err);
//     }
// })

//Handling request body and json data
app.use(express.urlencoded({extended: true})) 
app.use(express.json())

app.use(
    cookieSession({
        name: 'session',
        keys: ['FGD456d45fgh', 'GR64dh654h']
    })
)

//Creating new services instances to be injected into routes
const speakerService = new SpeakerService(config)
const feedbackService = new FeedbackService(config)

//Using routes
app.use('/', routes({speakerService, feedbackService}))

//Error Handlers
app.use((req, res, next) => {
    console.log('Access to a file not found!')
    return next(createError(404, 'File not found'))
})

app.use((error, req, res, next) => {
    res.json({Error: error.message})
})

// //Capture generated error and show it in error page
// app.use((err, req, res, next) => {
//     //Global error message which can be used in error template
//     app.locals.errMessage = err.message;
//     //Global error code also can be directly used in error template
//     app.locals.errStatus = 500 || err.status;
//     //Inject error page into layout template 
//     res.status(errStatus).render('layout', {template: 'error'});
// })

//App listening on port
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
