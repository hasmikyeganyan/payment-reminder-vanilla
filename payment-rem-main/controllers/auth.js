import { AUTH_REQUEST_OPTIONS, BASE_URL, handleFetch, REQUEST_OPTIONS } from '../api.js';

export const signIn = (email, password) => {
  const data = { email, password };

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/signin`, {
      ...REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const signUp = (fullname, email, password) => {
  const data = { fullname, email, password };

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/signup`, {
      ...REQUEST_OPTIONS,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const fetchSelf = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/self`, {
      ...AUTH_REQUEST_OPTIONS,
      method: 'GET',
    })
      .then((response) => handleFetch(response, resolve, reject))
      .catch((_) => reject());
  });
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
  window.location.replace('/auth/signin.html');
};
