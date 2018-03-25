/*
 This is the initialization file for passport
 Serialzation and De-Serialization functions are helpfull to establish
 connection persisitent login connection to the server.
*/

// TODO: Reset password and Change Password needs to be implemented 
var login = require('./login');
var signup = require('./signup');
var deactivateUser = require('./deactivateUser');
var activateUser = require('./activateUser');
var deleteUser = require('./deleteUser');
var addProject = require('./addProject');
var User = require('../models/Users');

module.exports = function(passport){

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

    // Setting up Passport Strategies for SignUp/Registration,
    //LogIn and Reset Password
    signup(passport);
    login(passport);
    deactivateUser(passport);
    activateUser(passport);
    deleteUser(passport);
    addProject(passport);
    //TODO: Reset Password and Change Password

}