const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { route } = require('express/lib/application')
const res = require('express/lib/response')
const fs = require('fs');
const crypto = require("crypto");
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router();

const Movie = require('../models/movie')
const Slider_01 = require('../models/slider/slider_01')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error(' File must be a image file such as: jpg, jpeg, png'))
        }
        cb(undefined, true)
    }
})

// Create router for add video
router.post('/videos/add', upload.single('slider_image'), async (req,res) => {
    const movie = new Movie(req.body)
    const slider_01 = new Slider_01(req.body)
    movie.movie_id = crypto.randomBytes(16).toString("hex")
    slider_01.movie_id = movie.movie_id
    console.log(movie)
    console.log(slider_01)
    try{
        await movie.save()
        await slider_01.save()
        res.status(201).send(movie)
        console.log(movie.movie_name_1 + ' was created succesful!')
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
        
        res.render('single', {
            movie_src: movie.movie_video,
        });
        console.log('Found a result', movie)
    }catch(e){
        res.status(500).send(e.message)
    }

})



module.exports = router