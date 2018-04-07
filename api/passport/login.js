// Passport log-in using Local-Stratagy that means using our own server
// without using Google Auth or Facebook Auth.

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');//? I am using bcrypt-nodejs because i feel it less intuative we can change it if we want 

module.exports = function (passport) {
    passport.use('login', new LocalStrategy({
        // by default, local strategy uses email and password, 
        // we should override with email if we want to override it.
        usernameField: 'email',
        passwordField: 'password',
        // allows us to pass back the entire request to the callback
        passReqToCallback: true
    },
        // Request is automatically passed to the passport 
        // We must call done which is like the response to the passport
        function (req, username, password, done) {
            console.log('before loginuser' + req);
            // check in mongo if a user with email exists or not
            loginUser = function () {
                User.findOne({ 'email': username }, function (err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with Email ' + username);
                        return done(null, false, { message: 'User Not Found with Email' });
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, { message: 'Invalid Password' }); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    
                    console.log('Successfully logged in', user.email);
                    return done(null, user, { message: 'Successfully logged in' });
                });
            }
            process.nextTick(loginUser);
        })
    );

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}