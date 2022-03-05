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
const Slider = require('../models/slider')

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
router.post('/videos/add', upload.single('movie_poster'), async (req,res) => {
    const movie = new Movie(req.body)
    movie.movie_id = crypto.randomBytes(16).toString("hex")
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    movie.movie_poster = buffer
    console.log(buffer)
    console.log(movie)
    try{
        await movie.save()
        res.status(201).send(movie)
        console.log(movie.movie_name_1 + ' was created succesful!')
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})

// Create router for index page
router.post('/',  async (req,res) => {
    const slider = new Slider();
    res.render('index', {
         
    })
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