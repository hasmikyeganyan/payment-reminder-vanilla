const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please supply a name',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
