// Require Mongose ORM
var Mongoose = require('mongoose');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var CategorySchema = new Schema({
  categoryName: { type: String },
  arrayOfProjectIds: { type: Array }
});

// This will creates database named "Categories" in the Database
var Categories = Mongoose.model('Categories', CategorySchema);

// We are making available it to other files
module.exports = Categories;
