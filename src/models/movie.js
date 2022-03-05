const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    movie_id:{
        type: String,
        required:true
    },
    movie_name_1:{
        type: String,
        required:true
    },
    movie_name_2:{
        type: String,
        
    },
    movie_name_3:{
        type: String,
        
    },
    movie_name_4:{
        type: String,
        
    },
    movie_name_5:{
        type: String,
        
    },
    movie_video:{
        type: String,
        required:true
    },
    movie_poster: {
        type: Buffer,
    }
} ,
{
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie