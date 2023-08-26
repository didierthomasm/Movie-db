const express = require('express');
const moviesRouter = require('./movies');
const reviewsRouter = require('./reviews');
const addMovieRouter = require('./addMovie');
const updateReviewRouter = require('./updateReview');
const deleteMovieRouter = require('./deleteMovie');

const app = express();

app.use('/movies', moviesRouter);
app.use('/movie-reviews', reviewsRouter);
app.use('/add-movie', addMovieRouter);
app.use('/review', updateReviewRouter);
app.use('/movie', deleteMovieRouter);

module.exports = app;