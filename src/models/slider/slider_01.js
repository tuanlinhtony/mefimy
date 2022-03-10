const mongoose = require('mongoose');
const validator = require('validator');

const slider_01_Schema = new mongoose.Schema({
    movie_id:{
        type: String,
        required: true
    },
    slider_image:{
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const Slider_01 = mongoose.model('Slider_01', slider_01_Schema)

module.exports = Slider_01