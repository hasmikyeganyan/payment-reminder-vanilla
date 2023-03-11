const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const transactionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: 'Please supply a title',
    },
    type: {
      type: String,
      trim: true,
      required: 'Please supply a type',
    },
    amount: {
      type: Number,
      required: 'Please supply an amount',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    date: {
      type: Date,
      required: 'Please supply a date',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
