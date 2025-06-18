const express = require('express');
const Drawing = require('../models/Drawing');

const router = express.Router();

// Save a drawing
router.post('/', async (req, res) => {
  try {
    const { name, shapes } = req.body;
    if (!name || !shapes || !Array.isArray(shapes)) {
      return res.status(400).json({ error: 'Name and shapes array are required' });
    }
    const drawing = new Drawing({ name, shapes });
    await drawing.save();
    res.status(201).json(drawing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all drawings
router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find().sort({ createdAt: -1 });
    res.json(drawings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a drawing
router.delete('/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) {
      return res.status(404).json({ error: 'Drawing not found' });
    }
    res.json({ message: 'Drawing deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;