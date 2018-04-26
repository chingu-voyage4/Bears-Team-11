var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var RevisionSchema = new Schema({
  revisionNumber: { type: String },
  finalVersion: { type: Boolean },
  imageURL: { type: String },
  createdAt: { type: Date, default: Date.now() },
  creator: { type: String },
  markers: [{ type: Schema.Types.ObjectId, ref: 'Markers' }],
  project: { type: Schema.Types.ObjectId, ref: 'Projects' },
  description: { type: String }
});

var Revisions = Mongoose.model('Revisions', RevisionSchema);

module.exports = Revisions;
