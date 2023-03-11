import { AUTH_REQUEST_OPTIONS, BASE_URL, handleFetch } from '../api.js';

export const fetchCategories = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/categories`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const createCategory = (category) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/categories`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(category),
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};
