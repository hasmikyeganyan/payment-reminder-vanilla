import { notify } from './assets/js/notify.js';
import { handleError, handleInvalidForm } from './api.js';
import { logout, signIn, signUp } from './controllers/auth.js';

// Functions to be called first when the page loads
const _init = () => {
  if (sessionStorage.getItem('accessToken')) window.location.replace('/');
};

_init();

// SIGN IN
// check if we are in signin page
const loginForm = document.querySelector('#login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    if (!email || !password) return handleInvalidForm();

    signIn(email, password)
      .then((response) => {
        const { accessToken } = response;

        if (accessToken) {
          sessionStorage.setItem('accessToken', accessToken);
          window.location.href = '/';
        } else throw new Error();
      })
      .catch((error) => handleError(error));
  });
}

// SIGN UP
const signupForm = document.querySelector('#signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = signupForm['fullname'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    if (!email || !password || !fullname) return handleInvalidForm();

    signUp(fullname, email, password)
      .then((response) => {
        if (response.ok) {
          notify.addNotification({
            type: 'success',
            title: 'Success!',
            message: 'Account created successfully!',
          });
          setTimeout(() => (window.location.href = '/auth/signin.html'), 1000);
        }
      })
      .catch((error) => handleError(error));
  });
}
