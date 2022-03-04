const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { route } = require('express/lib/application')
const res = require('express/lib/response')
const fs = require('fs');
const crypto = require("crypto");
const router = new express.Router();

const Movie = require('../models/movie')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Create router for index page
router.post('/videos/add', async (req,res) => {
    const movie = new Movie(req.body)
    movie.movie_id = crypto.randomBytes(16).toString("hex")
    console.log(movie)
    try{
        await movie.save()
        res.status(201).send(movie)
        console.log(movie.movie_name + ' was created succesful!')
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})

// Create router for index page
router.get('/watch/:id', async (req,res) => {
    const _id = req.params.id

    //refactor with async/await
    try{
        // const task = await Task.findById(_id)
        const movie = await Movie.findOne({movie_id: _id})
        if(!movie){
            return res.status(404).send()
        }
        
        res.render('playVideo', {
            src: movie.movie_url,
            movie_name: movie.movie_name,
            data: movie.movie_id
        });
        console.log('Found a result', movie)
    }catch(e){
        res.status(500).send(e.message)
    }

})


module.exports = router