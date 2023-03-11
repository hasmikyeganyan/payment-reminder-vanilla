const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.statusMessage = 'No token provided';
    return res.status(403).send();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.statusMessage = 'Unauthorized';
      return res.status(401).send();
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
