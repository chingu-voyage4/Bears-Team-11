var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var RevisionSchema = new Schema({
  revisionNumber: { type: String },
  finalVersion: { type: Boolean },
  image: { type: String },
  createdAt: { type: Date, default: Date.now() },
  creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  createdAt: { type: Date },
  markers: [{ type: Schema.Types.ObjectId, ref: 'Markers' }]
});

var Revisions = Mongoose.model('Revisions', RevisionSchema);

module.exports = Revisions;
