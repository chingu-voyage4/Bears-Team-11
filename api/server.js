const express = require('express');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./utils/auth');
const morgan = require('morgan');

const app = express();

const sessionSecret = require('./config');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false, // forces sesseion to be saved even when there was no change
    saveUninitialized: false // forces uninitialized sessions to be saved
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/user', userRoutes);

module.exports = app;
