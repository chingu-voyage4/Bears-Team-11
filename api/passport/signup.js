/* 
 * SignUp functionality to the user using Local Strategy
 * First checks if the email or username already regestered in the DB,
 * Creates an user in the DB with user credentials 
 * We are hashig password using bcrypt-nodejs to make it secure
*/
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');
var UserDetails = require('../models/UserDetails');

module.exports = function(passport) {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        findOrCreateUser = function() {
          User.findOne(
            { $or: [{ email: username }, { username: req.body.username }] },
            function(err, user) {
              if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
              }
              if (user) {
                console.log('User already exists with this email or username');
                return done(null, false, {
                  message: 'User already exists with this email or username'
                });
              } else {
                var newUser = new User();

                newUser.username = req.body.username;
                newUser.password = createHash(password);
                newUser.email = username;
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;

                newUser.save(function(err, newUser) {
                  if (err) {
                    console.log('Error in Saving user: ' + err);
                    throw err;
                  }
                  console.log('User Registration succesful');
                  return done(null, newUser, {
                    message: 'User Registration Succesful'
                  });
                });
              }
            }
          );
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );

  // Generates hash using bCrypt
  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
