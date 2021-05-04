const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../key');

const verifyToken = (req, res, next) => {
  const token =
    req.query.accessToken || req.body.accessToken || req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'No token' });
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'faild to auth' });
    }

    req.user = decoded;
    next();
    return decoded;
  });
  return { success: true };
};

module.exports = verifyToken;
