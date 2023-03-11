import { createAccountListElement } from './assets/js/elements.js';
import { handleError } from './api.js';
import { fetchSelf, logout } from './controllers/auth.js';
import { fetchAndRenderTransactions } from './transactions.js';
import { fetchAndRenderCategories } from './categories.js';
import { fetchAndRenderCategoriesReport, fetchAndRenderReport } from './reports.js';

// Functions to be called first when the page loads
const _init = () => {
  if (!sessionStorage.getItem('accessToken')) window.location.replace('/auth/signin.html');

  fetchAndRenderCategories();
  fetchAndRenderTransactions();
  fetchAndRenderReport();
  fetchAndRenderCategoriesReport();

  fetchSelf()
    .then((response) => {
      renderAccountsList([response]);
      renderAccountPicture(response);
    })
    .catch((error) => handleError(error));
};

_init();

const signOutBtn = document.getElementById('sidebar-logout');
signOutBtn.addEventListener('click', () => logout());

// Render the dashboard
const renderAccountsList = (accounts) => {
  const accountsList = document.getElementById('accounts-list');
  accounts.forEach((account) => accountsList.appendChild(createAccountListElement(account)));
};

const renderAccountPicture = (account) => {
  const accountPicture = document.getElementById('account-picture');
  accountPicture.src = `https://robohash.org/${account.email}`;
};
