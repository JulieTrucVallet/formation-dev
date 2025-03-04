import { Router } from 'express'
import movies from '../data/movies.js'

const moviesRouter = Router()

moviesRouter.get('/movies', (request, response) => {
    return response.json(movies)
})

moviesRouter.get('/movies/:id', (request, response) => {
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

moviesRouter.post('/movies', (request, response) => {
    const {title, genre} = request.body
    const newMovie = {
        id : movies.length + 1,
        title,
        genre
    }
    movies.push(newMovie)
    return response.status(201).json(newMovie)
})

moviesRouter.put('/movies/:id', (req, res) => {
    const {id} = req.params
    const {title, genre} = req.body
    let movieByID = movies.find(movie => movie.id === parseInt(id))
    if(!movieByID){
        return res.status(404).json({message : `Movie not found`})
    }
    movieByID = {
        id : movieByID.id,
        title : title || movieByID.title,
        genre : genre || movieByID.genre
    }

    return res.status(201).json(movieByID)
})

moviesRouter.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    try{
        let movieByID = movies.find(movie => movie.id === parseInt(id))
        if(!movieByID){
            return res.status(404).json({message : `Movie not found`})
        }
        const movieIndex = movies.indexOf(movieByID)
        movies.slice(movieIndex, 1)
        return res.status(202).json('Movie has been deleted')
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : 'Internal server error'})
    }
})

export default moviesRouter