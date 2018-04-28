var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.use(
    'deleteUser',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        findAndVerifyUser = function() {
          User.findOne({ username: username }, function(err, user) {
            if (err) return done(err);
            if (!user) {
              return done(null, false, { message: user + ' not found' });
            }
            if (!isValidPassword(user, password)) {
              return done(null, false, { message: 'Invalid Password' });
            }
            return done(null, user, {
              message: 'User is authorized to delete their account'
            });
          });
        };
        process.nextTick(findAndVerifyUser);
      }
    )
  );

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
};
