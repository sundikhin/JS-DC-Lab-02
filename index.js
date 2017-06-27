const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://sundi:11241602@pokedex-shard-00-00-pyl4x.mongodb.net:27017,pokedex-shard-00-01-pyl4x.mongodb.net:27017,pokedex-shard-00-02-pyl4x.mongodb.net:27017/pokedex?ssl=true&replicaSet=pokedex-shard-0&authSource=admin');

const Artist = require('./models/artist.js');

const appRoutes = require('./routes/index.js');
const artistsRouter = require('./routes/artists.js');

const app = express();

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serving static files (like css)
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', appRoutes);
app.use('/artists', artistsRouter);

app.listen(3000);