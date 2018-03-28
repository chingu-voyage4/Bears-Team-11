// Passport log-in using Local-Stratagy that means using our own server
// without using Google Auth or Facebook Auth.

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');//? I am using bcrypt-nodejs because i feel it less intuative we can change it if we want 

module.exports = function (passport) {
    passport.use('deleteUser', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        // allows us to pass back the entire request to the callback
        passReqToCallback: true
    },
        // Request is automatically passed to the passport 
        // We must call done which is like the response to the passport
        function (req, username, password, done) {
            User.findOne({ 'username': username }, function (err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log the error and redirect back
                if (!user) {
                    console.log(user + ' not found');
                    return done(null, false, { message: user + ' not found' });
                }
                // User exists but wrong password, log the error 
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false, { message: 'Invalid Password' });
                }
                console.log('User is authorized to delete their account')
                return done(null, user, { message: 'User is authorized to delete their account' });
            })
        })
    );


    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

}