const http = require('http');
const path = require('path');
const hbs = require('hbs');
require('./db/mongoose');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

const pageRouter = require('./routers/page');
const movieRouter = require('./routers/movie');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(bodyParser.json());
app.use(express.json());

app.use(pageRouter);
app.use(movieRouter);


module.exports = app;