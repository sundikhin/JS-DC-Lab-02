const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a Schema
const artistSchema = new Schema({
  name: String,
  genre: String,
  website: String,
  image: String,
  bio: String,
  comments: Array
});

// Use the Schema to build model
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
