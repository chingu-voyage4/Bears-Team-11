// Require Mongoose Schema to Make Mongoose Object
var Mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = Mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String },
  creator: { type: String }, // XXX: may want to use Users ref
  githubLink: { type: String },
  mockupLink: { type: String },
  liveLink: { type: String },
  images: { type: Array },
  team: { type: Array }, // XXX: may want to use an array of Users ref
  description: { type: String },
  contact: { type: String },
  lookingFor: { type: Array },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  views: { type: Number, default: 0 },
  category: { type: String },
  tags: { type: Array },
  status: { type: Boolean, default: true }, // true is active, false is completed
  upVotes: { type: Number, default: 0 },
  modifiedAt: { type: Date, default: Date.now },
  revisions: [{ type: Schema.Types.ObjectId, ref: 'Revisions' }]
});

ProjectSchema.plugin(mongoosePaginate);

// This will creates database named "Projects" in the Database
var Projects = Mongoose.model('Projects', ProjectSchema);

// We are making available it to other files
module.exports = Projects;
