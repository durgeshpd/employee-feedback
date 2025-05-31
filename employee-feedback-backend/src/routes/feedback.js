const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { text, category } = req.body;
  if (!text) return res.status(400).json({ message: 'Feedback text is required' });

  try {
    const feedback = new Feedback({ text, category });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Error in POST /feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  try {
    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error in GET /feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/reviewed', auth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    feedback.reviewed = true;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error('Error in PATCH /feedback/:id/reviewed:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    await feedback.deleteOne();
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    console.error('Error in DELETE /feedback/:id:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
