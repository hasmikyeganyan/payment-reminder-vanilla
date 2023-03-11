const User = require('../models/user.model.js');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  if (!fullname) {
    res.statusMessage = 'Fullname is required';
    return res.status(400).send();
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.statusMessage = 'Email already exists';
      return res.status(400).send();
    }
  });

  const user = new User({
    fullname: fullname,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });

  user.save((err, _) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.statusMessage = 'User was registered successfully';
    res.status(200).send();
  });
};

exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.statusMessage = 'User Not found';
      return res.status(404).send();
    }

    let passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      res.statusMessage = 'Invalid Credentials';
      return res.status(401).send();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      accessToken: token,
    });
  });
};

exports.self = (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.statusMessage = 'User Not found';
        return res.status(404).send();
      }

      res.status(200).send(user);
    });
};
