var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var MarkerSchema = new Schema({
  type: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'Users' },
  createdAt: { type: Date, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number }
});

var Markers = Mongoose.model('Markers', MarkerSchema);

module.exports = Markers;
