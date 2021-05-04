const express = require('express');

const router = express.Router();

const auth = require('./auth');
const pool = require('./db');
const suppliers = require('./suppliers');

// const verifyToken = require('./middleware/verifyToken');

// Test verify route
// router.get('/test', verifyToken, (req, res) =>{
//   res.json(req.user)
// });

// router.get('/cookie', (req, res) =>{
//   res.send(req.headers.cookie)
// })
// router.get('/token',(req, res)=>{
//   res.send(req.headers)
// })
router.post('/login', auth.postUserLogin);
router.post('/signup', auth.createUser);
router.get('/logout', auth.getUserLogout);

router.use('/spuuliers', suppliers);

router.get('/me/profile', (req, res) => {
  const { id } = req.query;
  pool
    .query(`SELECT * from public.uer WHERE id=$1`, [id])
    .then(result => {
      if (result) res.status(200).json({ success: true, data: result });
    })
    .catch(err => {
      if (err) res.status(500).json(err);
    });
});
module.exports = router;
