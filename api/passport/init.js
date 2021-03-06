/*
 This is the initialization file for passport
 Serialzation and De-Serialization functions are helpfull to establish
 connection persisitent login connection to the server.
*/
var login = require('./login');
var signup = require('./signup');
var deactivateUser = require('./deactivateUser');
var deleteUser = require('./deleteUser');
var project = require('../routes/project.js');
var User = require('../models/Users');

module.exports = function(passport) {
  // Passport needs to be able to serialize and deserialize users
  // to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ' + user.email);
    // Passport saves userId as a local refference in the server
    // To recognize and get the details of the user
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    // Uses the userId used in the serialization to retrive the user
    // deatails
    User.findById(id, function(err, user) {
      // TODO: remove when pusing into the production
      console.log('deserializing user: ' + user.email);
      done(err, user);
    });
  });

  signup(passport);
  login(passport);
  deactivateUser(passport);
  deleteUser(passport);
  project(passport);
  //TODO: Reset Password and Change Password
};
