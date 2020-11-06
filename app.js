/**
 * Express app for pub-quiz
 */

const express = require('express');

const ExpressError = ('./helpers/ExpressError');

const musicRoutes = require('./routes/music')
const quotesRoutes = require('./routes/quotes')
const thesaurusRoutes = require('./routes/thesaurus')
const triviaRoutes = require('./routes/trivia')

const morgan = require('morgan');

const app = express();

// Middleware
// recognize incoming request object as JSON
app.use(express.json());

// add logging system
app.use(morgan('tiny'));

// app.use('/music', musicRoutes);
// app.use('/quotes', quotesRoutes);
// app.use('/thesaurus', thesaurusRoutes);
app.use('/trivia', triviaRoutes);

/** 404 handler */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app