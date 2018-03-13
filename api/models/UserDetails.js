/* This is The User Details Schema For MongoDB and Mongoose
 * It contain fields for id, location,roles,
 * description,techstack,projects,projects_bookmarked,
 */
// Require Mongose ORM 
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var UserDetailsSchema = new Schema({
    user:       {type:String},
    location:   {type: String}, 
    roles:      {type: Array}, //?
    descreption:{type: String},
    techstack:  {type: Array},//?
    projects:   {type: Array},//?
    bookmarked: {type: Array},//?
    links:      {type: Array}
});

// This will creates database collection named "UserDetails" in the Database
var UserDetails =  Mongoose.model("Users",UserDetailsSchema);

// We are making available it to other files
module.exports = UserDetails;