var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var MarkerSchema = new Schema({
  type: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number }
});

var Markers = Mongoose.model('Markers', MarkerSchema);

module.exports = Markers;
