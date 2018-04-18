var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var RevisionSchema = new Schema({
  revisionNumber: { type: String },
  finalVersion: { type: Boolean },
  createdAt: { type: Date, default: Date.now() },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date },
  markers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marker' }]
});

var Revisions = Mongoose.model('Revisions', RevisionSchema);

module.exports = Revisions;
