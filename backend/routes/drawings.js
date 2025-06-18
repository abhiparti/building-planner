const express = require('express');
const router = express.Router();
const Drawing = require('../models/Drawing');


router.post('/', async (req, res) => {
  try {
    const { name, shapes } = req.body;
    if (!name || !shapes) {
      return res.status(400).json({ error: 'Name and shapes are required' });
    }
    const drawing = new Drawing({ name, shapes });
    await drawing.save();
    res.status(201).json(drawing);
  } catch (error) {
    console.error('Error saving drawing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.json(drawings);
  } catch (error) {
    console.error('Error fetching drawings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) {
      return res.status(404).json({ error: 'Drawing not found' });
    }
    res.json({ message: 'Drawing deleted' });
  } catch (error) {
    console.error('Error deleting drawing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;