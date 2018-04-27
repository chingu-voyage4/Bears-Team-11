var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        loginUser = function() {
          User.findOne({ email: username }, function(err, user) {
            if (err) return done(err);
            if (!user) {
              return done(null, false, {
                message: 'User Not Found with Email'
              });
            }
            if (!isValidPassword(user, password)) {
              return done(null, false, { message: 'Invalid Password' });
            }
            return done(null, user, { message: 'Successfully logged in' });
          });
        };
        process.nextTick(loginUser);
      }
    )
  );

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
};
