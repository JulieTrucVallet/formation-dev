import express from 'express'
// Import de library express
import movies from './data/movies.js'

const app = express()
// App take everything from express
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (request, response) => {
    return response.end(`Welcome to my movies API`)
})
// Our first route that takes the path as first parameters, request and response and return a response

app.get('/movies', (request, response) => {
    return response.json(movies)
})

app.get('/movies/:id', (request, response) => {
    const movieID = request.params.id
    // I save into a variable the value of the params
    const movieByID = movies.find(movie => movie.id === parseInt(movieID))
    // I search in the array where I do have an object with his ID matching the request.params.id
    if(!movieByID){
        return response.status(404).json({message : `Movie not found`})
    }
    // If I do not find a movie I send an error
    return response.status(200).json(movieByID)
    // I return the movieByID
})

app.post('/movies', (request, response) => {
    console.log(request.body)
    const {title, genre} = request.body
    const newMovie = {
        id : movies.length + 1,
        title,
        genre
    }
    movies.push(newMovie)
    return response.status(201).json(newMovie)
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})
// The method listen is used to start our server