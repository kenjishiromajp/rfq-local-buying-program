const express = require('express');

const router = express.Router();

const db = require('./auth');
const verifyToken = require('./middleware/verifyToken');

// Test verify route
router.get('/test', verifyToken, (req, res) => {
  res.json({ message: 'Test valid' });
});

router.post('/login', db.getUserLogin);
router.post('/signup', db.createUser);

module.exports = router;
