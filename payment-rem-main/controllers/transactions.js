import { AUTH_REQUEST_OPTIONS, BASE_URL, handleFetch } from '../api.js';

export const fetchTransactions = (search, date) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}/transactions`;
    if (search) url += `?search=${search}`;
    if (date) url += `?date=${date}`;

    fetch(url, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const createTransaction = (transaction) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/transactions`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(transaction),
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const fetchCategoryTransactions = (categoryId) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/categories/${categoryId}`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => {
        if (response.ok)
          response
            .json()
            .then((data) => resolve(data.transactions))
            .catch((_) => resolve(response));
        else reject(response);
      })
      .catch((_) => reject());
  });
};

export const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/transactions/${id}`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'DELETE',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};
