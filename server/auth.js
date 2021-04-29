const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token =
    req.query.token || req.body.token || req.header['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'No token' });
  }
  jwt.verify(token, process.env.SECRET_VALUE, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'faild to auth' });
    }
    req.decode = decoded;
    next();
    return 0;
  });
  return 0;
};

module.exports = {
  verifyToken,
};
