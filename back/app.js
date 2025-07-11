// app.js
const createError = require('http-errors');
const express     = require('express');
const path        = require('path');
const logger      = require('morgan');
const cors        = require('cors');

const indexRouter      = require('./routes/index');
const activitiesRouter = require('./routes/activities');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/activities', activitiesRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, _next) {
  res.status(err.status || 500);
  res.json({ ok:false, message: err.message });
});

module.exports = app;
