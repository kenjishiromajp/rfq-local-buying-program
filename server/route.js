const express = require('express');

const router = express.Router();

const auth = require('./auth');
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
module.exports = router;
