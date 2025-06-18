const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  id: Number,
  type: { type: String, enum: ['line', 'rectangle', 'circle', 'triangle'], required: true },
  points: [Number], 
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  radius: Number,
  stroke: String,
  strokeWidth: Number,
  selected: Boolean,
});

const drawingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shapes: [shapeSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Drawing', drawingSchema);