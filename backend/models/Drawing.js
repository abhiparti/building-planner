const mongoose = require('mongoose');

// Schema for drawings
const drawingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shapes: [{
    type: { type: String, enum: ['line', 'rectangle', 'circle', 'triangle'], required: true },
    x1: Number,
    y1: Number,
    x2: Number,
    y2: Number,
    x3: Number, // For triangle
    y3: Number, // For triangle
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    radius: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Drawing', drawingSchema);