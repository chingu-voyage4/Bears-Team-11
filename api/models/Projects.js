/* This is The Projects Schema For MongoDB and Mongoose ORM.
 * It contain fields for id,name, creater, link,image,description,
 * team_members,contact,looking_for,comments,due_date,
 * # of Views,tags,category,creation_date,status,upvotes
*/
// Require Mongose ORM 
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var ProjectSchema = new Schema({
    name:       {type: String},
    creator:    {type: String},
    link:       {type: String},
    image:      {type: String}, 
    teamMembers:{type: Array},
    descreption:{type: String},
    contact:    {type: String},
    lookingFor: {type: Array},
    comments:   {type: String},//?
    createdAt:  {type: Date,default: Date.now},
    dueDate:    {type: Date},
    views:      {type: Number},
    category:   {type: String},
    status:     {type: Boolean},
    upVotes:    {type:Number}
});

// This will creates database named "Projects" in the Database
var Projects =  Mongoose.model("Projects",ProjectSchema);

// We are making available it to other files
module.exports = Projects;