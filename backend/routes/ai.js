const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/semantic-search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ message: 'query is required' });
    const result = await aiService.semanticSearch(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
