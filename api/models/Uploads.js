/* This is The uploads Schema For MongoDB and Mongoose ORM.
 * It contain fields for id,user,date,file_name,file_location
*/
// Require Mongose ORM 
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} followed by ','
var UploadsSchema = new Schema({
    user:    {type: String},
    fileName:    {type: String},
    fileLocation:{type: String},
    createdAt:  {type: Date,default: Date.now},
});

// This will creates database named "Uploads" in the Database
var Uploads =  Mongoose.model("Uploads",UploadsSchema);

// We are making available it to other files
module.exports = Uploads;