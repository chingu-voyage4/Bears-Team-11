const User = require('../stubs/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// serialize user to the session using the id
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// uses the user id to find the user and the user will be stored in req.user
passport.deserializeUser(function(id, done) {
  const user = User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error());
  }
});

// authenticate user
passport.use(
  new LocalStrategy(function(email, password, done) {
    const user = User.find({ email });
    if (!user || user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);

module.exports = passport;
