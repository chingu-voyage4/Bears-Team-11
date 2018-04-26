var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var MarkerSchema = new Schema({
  type: { type: String }, // rectangle or circle
  creator: { type: String },
  createdAt: { type: Date, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  revision: { type: Schema.Types.ObjectId, ref: 'Revisions' },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number }
});

var Markers = Mongoose.model('Markers', MarkerSchema);

module.exports = Markers;
