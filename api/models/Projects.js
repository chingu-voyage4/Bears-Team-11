// Require Mongoose Schema to Make Mongoose Object
var Mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = Mongoose.Schema;

var ProjectSchema = new Schema({
    // _id:        {type: Schema.Types.ObjectId },
    name:       {type: String},
    creator:    {type: String},
    githubLink: {type: String},
    mockupLink: {type: String},
    liveLink:   {type: String},
    image:      {type: Array}, 
    mockups:    {type: Array}, // stores _Id for each mockup image
    team:       {type: Array},
    description:{type: String},
    contact:    {type: String},
    lookingFor: {type: Array},
    comments:   {type: Array, default: null},
    createdAt:  {type: Date, default: Date.now},
    dueDate:    {type: Date},
    views:      {type: Number, default: 0},
    category:   {type: String},
    tags:       {type: Array},
    status:     {type: String},
    upVotes:    {type: Number, default: 0},
    modifiedAt: {type: Date, default: Date.now}
});

ProjectSchema.plugin(mongoosePaginate);

// This will creates database named "Projects" in the Database
var Projects =  Mongoose.model("Projects", ProjectSchema);

// We are making available it to other files
module.exports = Projects;
