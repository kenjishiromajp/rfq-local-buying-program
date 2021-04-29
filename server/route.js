const express = require('express');

const router = express.Router();

const db = require('./db');

router.get('/', (req, res) => {
  res.send('get');
});

router.post('/', (req, res) => {
  res.cookie('test', 'test', { maxAge: 6000, httpOnly: true });
  res.send('test cookie');
});

router.post('/login', db.getUserSignIn);
router.post('/signup', db.createUser);

module.exports = router;
