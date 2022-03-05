const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const { route } = require('express/lib/application')
const res = require('express/lib/response')
const router = new express.Router()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Create router for index page
router.get('/', (req,res) => {
    const d = new Date();
    let year = d.getFullYear();
    res.render('index', {
        year:year,
        movie_name_slide_item_2: 'Belle: Rồng và công chúa tàn nhang'
    });  
})






module.exports = router