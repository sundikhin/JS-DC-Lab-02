const express = require('express')

const Artist = require('../models/artist.js')

const artistsRouter = express.Router()

// define our routes
// url: localhost:3000/artists/new-artist
artistsRouter.get('/new-artist', ( req, res ) => {
  res.render('artists/new-artist')
}).post('/new-artist', ( req, res ) => {

  const newArtist = new Artist({
    name: req.body.name,
    genre: req.body.genre,
    website: req.body.website,
    image: req.body.image,
    bio: req.body.bio
  })

  newArtist.save()

  res.redirect('/')

})

// localhost:3000/artists/aeiwurq3o749849982o3
artistsRouter.get('/:id', ( req, res ) => {
  Artist.findOne({ '_id': req.params.id }, ( err, artist ) => {
    res.render('artists/show-artist', artist)
  })
})

artistsRouter.get('/edit-artist/:id', ( req, res ) => {
  Artist.findOne({ '_id' : req.params.id }, ( err, artist ) => {
    res.render('artists/edit-artist', artist)
  })
});

artistsRouter.post('/edit-artist/:id', ( req, res ) => {
  Artist.findOne( { '_id' : req.params.id }, ( err, artist ) => {
    artist.name = req.body.name;
    artist.genre = req.body.genre;
    artist.website = req.body.website;
    artist.image = req.body.image;
    artist.bio = req.body.bio;

    artist.save();

    res.redirect('/artists/'+req.params.id);
  })
})


artistsRouter.post('/:id', ( req, res ) => {
  Artist.findOne( { '_id' : req.params.id }, ( err, artist ) => {
    let newComment = {
      comment: req.body.comments
    }

    artist.comments.push(newComment)

    artist.save();

    res.redirect('/artists/'+req.params.id);
  })
})

artistsRouter.post('/remove/:id', ( req, res ) => {
  Artist.findOne({'_id' : req.params.id}, (err, artist) => {
    artist.remove();
    res.redirect('/');
  });
})

module.exports = artistsRouter
