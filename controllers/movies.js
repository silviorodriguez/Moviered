const { response, request } = require('express');
const Movie = require('../models/movies');

const movieGet = async(req = request, res= response) => {
    try {
        const queryParam = { state: true }
        const { limit = 1500 } = req.query
        const numeroEntradas = await Movie.countDocuments()
        const movie = await Movie.find(queryParam).limit(Number(limit))
    res.status(200).json({total: numeroEntradas, movie})
    } catch (error) {
        res.status(500).json({msg: 'Error al obtener las peliculas', error})
    }
    
}

const moviePost = async(req = request, res= response) => {
    try {
        const { name, year, runtime, categories, release_date, director, writer, actors, storyline, state, image } = req.body
    const data = {
        name,
        year,
        runtime,
        categories,
        release_date,
        director,
        writer,
        actors,
        storyline,
        state,
        image
    }
    const movie = new Movie(data)
    await movie.save()

    res.status(200).json({msg: 'Pelicula desde POST', movie})

    } catch (error) {
        res.status(500).json({msg: 'Error al crear la pelicula', error}) 
    }
}

const moviePut = async(req = request, res= response) => {
     try {
        const { id } = req.params
        const { name, year, runtime, categories, release_date, director, writer, actors, storyline, state, image } = req.body
        const data = {
            name,
            year,
            runtime,
            categories,
            release_date,
            director,
            writer,
            actors,
            storyline,
            state,
            image
        }
        const movie  = await Movie.findByIdAndUpdate(id, data)
        res.status(200).json({msg: 'Pelicula Actualizada Correctamente', ok:true})
    } catch (error) {
        res.status(500).json({msg: 'Error al actualizar la pelicula', error})
    } 
}

const movieDel = async(req = request, res= response) => {
    const { id } = req.params
    const falseState = { state: false }
    const movie = await Movie.findByIdAndUpdate(id, falseState )
    res.status(200).json({msg: `La pelicula con el id ${id} Fue eliminada correctamamente`})
}


module.exports = {
    movieGet,
    moviePost,
    moviePut,
    movieDel
}
