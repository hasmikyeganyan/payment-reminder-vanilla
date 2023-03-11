const Transaction = require('../models/transaction.model.js');
const Category = require('../models/category.model.js');
const User = require('../models/user.model.js');

exports.all = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Transaction.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $group: {
          _id: '$type',
          total: {
            $sum: '$amount',
          },
        },
      },
    ]).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      let indexOfIncome = data.findIndex((item) => item._id === 'income');
      let indexOfExpense = data.findIndex((item) => item._id === 'expense');

      if (indexOfIncome === -1) data.push({ _id: 'income', total: 0 });
      if (indexOfExpense === -1) data.push({ _id: 'expense', total: 0 });

      indexOfIncome = data.findIndex((item) => item._id === 'income');
      indexOfExpense = data.findIndex((item) => item._id === 'expense');

      const total = data[indexOfIncome].total - data[indexOfExpense].total;
      data.push({ _id: 'total', total });

      res.send(data);
    });
  });
};

exports.category = (req, res) => {
  const categoryId = req.params.categoryId;

  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Category.findById(categoryId, (err, category) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Transaction.aggregate([
        {
          $match: {
            user: user._id,
            category: category._id,
          },
        },
        {
          $group: {
            _id: '$type',
            total: {
              $sum: '$amount',
            },
          },
        },
      ]).exec((err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        let indexOfIncome = data.findIndex((item) => item._id === 'income');
        let indexOfExpense = data.findIndex((item) => item._id === 'expense');

        if (indexOfIncome === -1) data.push({ _id: 'income', total: 0 });
        if (indexOfExpense === -1) data.push({ _id: 'expense', total: 0 });

        indexOfIncome = data.findIndex((item) => item._id === 'income');
        indexOfExpense = data.findIndex((item) => item._id === 'expense');

        const total = data[indexOfIncome].total - data[indexOfExpense].total;
        data.push({ _id: 'total', total });

        res.send(data);
      });
    });
  });
};

// return ids of the most expensive 3 categories
exports.mostExpenseCategories = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Transaction.aggregate([
      {
        $match: {
          user: user._id,
          type: 'expense',
        },
      },
      {
        $group: {
          _id: '$category',
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $limit: 4,
      },
    ]).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const ids = data.map((item) => item._id);

      // fetch the name of the categories
      Category.find({ _id: { $in: ids } }, (err, categories) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        const result = data.map((item) => {
          const category = categories.find((category) => category._id.toString() === item._id.toString());

          return {
            _id: item._id,
            name: category.name,
            total: item.total,
          };
        });

        res.send(result);
      });
    });
  });
};
