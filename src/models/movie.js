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
    movie_video:{
        type: String,
        required:true
    },
    movie_video_endtime:{
        type: String,
        required:true
    },
    movie_audio:{
        type: String,
        required:true
    },
    movie_video_endmovie:{
        type: String,
        required:true
    },
    movie_banner: {
        type: Buffer,
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