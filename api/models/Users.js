/* This is The User Schema For MongoDB and Mongoose
 * It contain fields for id, name,password,email.
 */
// Require Mongose ORM 
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var UserSchema = new Schema({
    firstName:  {type: String},
    lastName:   {type: String},
    username:   {type: String},
    email:      {type: String},
    password:   {type: String},
<<<<<<< HEAD
    resetToken: {type: String},
    resetTokenExpires: {type: Date}
    
});


// This will creates database collection named "Users" in the Database
=======
    location:   {type: String}, 
    roles:      {type: Array}, //?
    descreption:{type: String},
    techstack:  {type: Array},//?
    projects:   {type: Array},//?
    bookmarked: {type: Array},//?
    links:      {type: Array}
});


// This will creates database named "Users" in the Database
>>>>>>> 4ed8682411a815ae7d3720712f4a324b05281132
var Users =  Mongoose.model("Users",UserSchema);

// We are making available it to other files
module.exports = Users;