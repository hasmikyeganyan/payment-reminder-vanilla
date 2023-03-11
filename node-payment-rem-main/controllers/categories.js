const Category = require('../models/category.model.js');
const User = require('../models/user.model.js');

exports.create = (req, res) => {
  const name = req.body.name;
  const userId = req.userId;

  if (!name || name.length < 2) return res.status(400).send({ message: 'Name is not valid' });

  try {
    const category = new Category({
      name: name,
      user: userId,
    });

    category.save((err, _) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      User.findById(userId, (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.categories.push(category._id);
        user.save((err, _) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send(category);
        });
      });
    });
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

exports.fetch = (req, res) => {
  const userId = req.userId;

  Category.find({ user: userId }, (err, categories) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(categories);
  });
};

exports.show = (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    Category.findById(id)
      .populate('transactions')
      .exec((err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!category) {
          res.statusMessage = 'Category Not found';
          res.status(404).send();
          return;
        }

        if (category.user != userId) {
          res.statusMessage = 'Forbidden';
          res.status(403).send();
          return;
        }

        res.send(category);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};
