const express = require('express');

const Artist = require('../models/artist.js');

const appRouter = express.Router();

appRouter.get('/', ( req, res ) => {
    Artist.find({}, ( err, artists  ) => {
        res.render('index', { artists })
    });
});

module.exports = appRouter;
