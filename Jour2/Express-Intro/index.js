import express from 'express'
// Import de library express
import 'dotenv/config'
import moviesRouter from './routes/moviesRouter.js'

const PORT = process.env.PORT || 3000

const app = express()
// App take everything from express
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('api/', moviesRouter)

app.get('/', (request, response) => {
    return response.end(`Welcome to my movies API`)
})
// Our first route that takes the path as first parameters, request and response and return a response

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})
// The method listen is used to start our server