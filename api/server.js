const express = require('express');
var path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./utils/config');
const app = express();
const mongoose = require('mongoose');
const initPassport = require('./passport/init');
var routes = require('./routes/index')(passport);
var forgetPasswordRout = require('./routes/forgetPassword');
var passwordResetRout = require('./routes/reset');
var projectsRoute = require('./routes/project');

// // Connect to DB-Local:
// NOTE: Uncomment below line if you want to save data locally
// mongoose.connect(config.db.local);

// Connect to DB-Cloud
// NOTE: Uncomment below line if you want to save data in the cloud(Mlab)
// mongoose.connect(config.db.mlab);

// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  mongoose.connect(config.db.local)
} 
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(config.db.mlab);
}

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: config.sessionSecret,
    resave: false, // forces sesseion to be saved even when there was no change
    saveUninitialized: false // forces uninitialized sessions to be saved
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// for using routs
app.use('/api', routes);
app.use('/api/forgot',forgetPasswordRout);
app.use('/api/reset',passwordResetRout);
app.use('/api/projects/', projectsRoute);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      // res.send('error', {
      //     message: err.message,
      //     error: err
      // });
  });
}

module.exports = app;

