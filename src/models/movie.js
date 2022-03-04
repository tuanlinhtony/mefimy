const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    movie_id:{
        type: String,
        required:true
    },
    movie_name:{
        type: String,
        required:true
    },
    movie_url:{
        type: String,
        required:true
    },
} ,
{
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie