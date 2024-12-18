/*eslint-disable*/

import { login, logout } from './login';
import '@babel/polyfill';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { signup } from './signup';

// DOM elements
const loginForm = document.querySelector('.formLogin');
const signupForm = document.querySelector('.formSignup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const logoutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');
const signupBtn = document.getElementById('signupBtn');

if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.btn--login').textContent = 'Logging in...';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await login(email, password);

    document.querySelector('.btn--login').textContent = 'Login';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.btn--signup').textContent = 'signing in...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    await signup(name, email, password, passwordConfirm);

    document.querySelector('.btn--signup').textContent = 'signin';
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    const form = new FormData();

    document.querySelector('.btn--save-settings ').textContent = 'Updating...';

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    await updateSettings(form, 'data');

    location.reload();
    document.querySelector('.btn--save-settings ').textContent =
      'save settings';
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
