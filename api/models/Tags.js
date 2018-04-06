// Require Mongose ORM 
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var TagSchema = new Schema({
    tagName:        {type: String},
    numOfProjects:  {type: Number}
});

// This will creates database named "Categories" in the Database
var Tags =  Mongoose.model("Tags",TagSchema);

// We are making available it to other files
module.exports = Tags;
