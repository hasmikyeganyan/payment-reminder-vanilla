const validateEmail = require('../utils/validations');

const verifyAuthCredentials = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.statusMessage = 'Email and Password are required';
    return res.status(400).send();
  }

  if (!validateEmail(email) || password.length < 6) {
    res.statusMessage = 'Email or Password are invalid';
    return res.status(400).send();
  }

  next();
};

module.exports = verifyAuthCredentials;
