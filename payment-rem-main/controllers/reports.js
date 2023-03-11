import { AUTH_REQUEST_OPTIONS, BASE_URL, handleFetch } from '../api.js';

export const fetchReport = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/reports`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const fetchCategoriesReport = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/reports/expense`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const fetchCategoryReport = (categoryId) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/reports/categories/${categoryId}`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};
