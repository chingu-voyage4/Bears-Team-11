const User = require('../stubs/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// serialize user to the session using the id
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// uses the user id to find the user and the user will be stored in req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// authenticate user
passport.use(
  new LocalStrategy(function(username, password, done) {
    const user = User.find({ username: username });
    if (!user || user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);

module.exports = passport;
