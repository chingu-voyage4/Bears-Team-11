// Passport log-in using Local-Stratagy that means using our own server
// without using Google Auth or Facebook Auth.

var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/Users');
var bCrypt = require('bcrypt-nodejs');//? I am using bcrypt-nodejs because i feel it less intuative we can change it if we want 

module.exports = function(passport){

	passport.use('deactivateUser', new LocalStrategy({
            // by default, local strategy uses email and password, 
            // we should override with email if we want to override it.
            usernameField : 'username',
            passwordField : 'password',
            // allows us to pass back the entire request to the callback
            passReqToCallback : true
        },
        // Request is automatically passed to the passport 
        // We must call done which is like the response to the passport
        function(req, username, password, done) { 
            // check for username and password, before doing FindOneAndUpdate() callback
            User.findOne({ 'username' :  username }, function (err, user) {
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
                return done(null, user);
            })
        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}