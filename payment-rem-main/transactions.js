import { handleError } from './api.js';
import { createTransactionListElement } from './assets/js/elements.js';
import {
  createTransaction,
  deleteTransaction,
  fetchCategoryTransactions,
  fetchTransactions,
} from './controllers/transactions.js';
import { fetchAndRenderCategoriesReport, fetchAndRenderReport } from './reports.js';

const transactionsList = document.getElementById('transactions-list');
const renderTransactionsList = (transactions) => {
  transactionsList.innerHTML = '';
  transactions.forEach((transaction) => transactionsList.appendChild(createTransactionListElement(transaction)));
};

export const fetchAndRenderTransactions = (search = '', date = '') => {
  fetchTransactions(search, date)
    .then((response) => renderTransactionsList(response))
    .catch((error) => handleError(error));
};

export const fetchAndRenderCategoryTransactions = (categoryId) => {
  fetchCategoryTransactions(categoryId)
    .then((response) => renderTransactionsList(response))
    .catch((error) => handleError(error));
};

const addTransactionForm = document.getElementById('add-transaction-form');
addTransactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = addTransactionForm['title'].value;
  const amount = +addTransactionForm['amount'].value;
  const date = addTransactionForm['date'].value;
  const categoryId = addTransactionForm['categoryId'].value;
  const type = addTransactionForm['type'].value;

  const transaction = {
    title,
    amount,
    date,
    categoryId,
    type,
  };

  createTransaction(transaction).then((response) => {
    if (response) {
      fetchAndRenderTransactions();
      fetchAndRenderReport();
      showAddTransactionModal(true);
      fetchAndRenderCategoriesReport();
    }
  });
});

const searchTransactionsForm = document.getElementById('search-transactions-form');
searchTransactionsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchTransactionsForm['search'].value;
  fetchAndRenderTransactions(search);
});

const dateFilterInput = document.getElementById('filter-date');
dateFilterInput.addEventListener('change', (e) => {
  e.preventDefault();
  const date = dateFilterInput.value;
  fetchAndRenderTransactions('', date);
});

export const deleteAndRenderTransactions = (id) => {
  deleteTransaction(id).then((response) => {
    if (response) {
      fetchAndRenderTransactions();
      fetchAndRenderReport();
      fetchAndRenderCategoriesReport();
    }
  });
};
