const mongoose = require('mongoose');
const validator = require('validator');

const sliderSchema = new mongoose.Schema({
    slider_id:{
        type: Array,
        required:true
    },
    movie_name:{
        type: Array,
        required:true
    },
    movie_video:{
        type: Array,
        
    },
    slider_banner: {
        type: Buffer,
    }
    
} ,
{
    timestamps: true
})

const Slider = mongoose.model('Slider', sliderSchema)

module.exports = Slider