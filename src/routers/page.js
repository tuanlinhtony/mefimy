const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { route } = require('express/lib/application')
const res = require('express/lib/response')
const router = new express.Router()

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const slider_01 = require('../models/slider/slider_01')
const { render } = require('../app')

// Create router for index page
router.get('/', (req,res) => {
    slider_01.find((err, docs) => {
        const string = JSON.stringify(docs);
        const objectValue = JSON.parse(string);
        console.log(objectValue[0].slider_image);
        res.render('index', {
            slider_image_01: objectValue[0].slider_image,
            synopsis: objectValue[0].synopsis,
            movieid_01:objectValue[0].movie_id
        })

    })
})

module.exports = router