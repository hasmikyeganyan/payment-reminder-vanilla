const Transaction = require('../models/transaction.model.js');
const Category = require('../models/category.model.js');
const User = require('../models/user.model.js');

exports.fetch = (req, res, _) => {
  const userId = req.userId;
  const query = req.query;
  const search = query.search;
  const date = query.date;

  if (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    const start = new Date(year, month, day);
    const end = new Date(year, month, day + 1);

    Transaction.find(
      {
        user: userId,
        date: { $gte: start, $lt: end },
      },
      (err, transactions) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send(transactions);
      }
    );
  } else if (search) {
    Transaction.find({ user: userId, title: { $regex: search, $options: 'i' } }, (err, transactions) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(transactions);
    });
  } else {
    Transaction.find({ user: userId }, (err, transactions) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(transactions);
    });
  }
};

exports.create = (req, res, _) => {
  const userId = req.userId;
  const categoryId = req.body.categoryId;
  const title = req.body.title;
  const type = req.body.type;
  const amount = req.body.amount;
  const date = req.body.date;

  if (!title || !type || !amount || !date) {
    res.statusMessage = 'Title, type, amount and date are required';
    res.status(400).send();
    return;
  }

  try {
    const transaction = new Transaction({
      amount: amount,
      title: title,
      type: type,
      date: date,
      user: userId,
      category: categoryId,
    });

    transaction.save((err, _) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      User.findById(userId, (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.transactions.push(transaction._id);
        user.save((err, _) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (categoryId) {
            Category.findById(categoryId, (err, category) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              category.transactions.push(transaction._id);
              category.save((err, _) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                res.send(transaction);
              });
            });
          } else res.send(transaction);
        });
      });
    });
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

exports.delete = (req, res, _) => {
  const userId = req.userId;
  const transactionId = req.params.id;

  Transaction.findById(transactionId, (err, transaction) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!transaction) {
      res.statusMessage = 'Transaction not found';
      res.status(404).send();
      return;
    }

    if (transaction.user != userId) {
      res.statusMessage = 'Unauthorized';
      res.status(401).send();
      return;
    }

    User.findById(userId, (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.transactions = user.transactions.filter((transaction) => transaction != transactionId);
      user.save((err, _) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (transaction.category) {
          Category.findById(transaction.category, (err, category) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            category.transactions = category.transactions.filter((transaction) => transaction != transactionId);
            category.save((err, _) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              Transaction.findByIdAndDelete(transactionId, (err, _) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                res.send();
              });
            });
          });
        } else {
          Transaction.findByIdAndDelete(transactionId, (err, _) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send();
          });
        }
      });
    });
  });
};
