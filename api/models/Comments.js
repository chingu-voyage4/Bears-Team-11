/* This is The Comments Schema For MongoDB and Mongoose ORM.
 * It contain fields for id,comment,date,user
*/
// Require Mongose ORM
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} followed by ','
var CommentsSchema = new Schema({
  creator: { type: String },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// This will creates database named "Comments" in the Database
var Comments = Mongoose.model('Comments', CommentsSchema);

// We are making available it to other files
module.exports = Comments;
