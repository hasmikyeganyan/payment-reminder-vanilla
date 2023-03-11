import { notify } from './assets/js/notify.js';

export const BASE_URL = 'https://node-payment-rem.vercel.app/api';

const BASIC_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};


export const REQUEST_OPTIONS = {
  headers: BASIC_HEADERS,
};

export const AUTH_REQUEST_OPTIONS = {
  headers: {
    ...BASIC_HEADERS,
    'X-ACCESS-TOKEN': `${sessionStorage.getItem('accessToken')}`,
  },
};

export const handleFetch = (response, res, rej) => {
  if (response.ok)
    response
      .json()
      .then((data) => res(data))
      .catch((_) => res(response));
  else rej(response);
};

export const handleError = (error) => {
  let message = 'Something went wrong!';

  if (error) message = error.statusText || error.message;

  notify.addNotification({
    type: 'error',
    title: 'Error!',
    message: message,
  });
};

export const handleInvalidForm = () => {
  notify.addNotification({
    type: 'error',
    title: 'Invalid Credentials!',
    message: 'Fields are required!',
  });
  return;
};
