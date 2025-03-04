import express from 'express'
// Import de library express
import movies from './data/movies.js'

const app = express()
// App take everything from express

app.get('/', (request, response) => {
    return response.end(`Welcome to my first API`)
})
// Our first route that takes the path as first parameters, request and response and return a response

app.get('/movies', (request, response) => {
    return response.json(movies)
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})
// The method listen is used to start our server