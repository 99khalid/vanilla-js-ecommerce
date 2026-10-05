// Sign up / sign in page. Accounts are kept in localStorage, so this is a front-end demo only.

const USERS_KEY = 'users';

const NAME_PATTERN = /^[A-Za-z ]{4,}$/;
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_PATTERN = /^.{8,}$/;

function getUsers() {
  return readJson(USERS_KEY, {});
}

function showError(element, message) {
  element.textContent = message;
  element.style.display = message ? 'block' : 'none';
}

function validateField(input, pattern, errorElement, message) {
  const isValid = pattern.test(input.value.trim());
  showError(errorElement, isValid ? '' : message);
  return isValid;
}

const signUpName = document.getElementById('sn');
const signUpEmail = document.getElementById('se');
const signUpPassword = document.getElementById('sp');
const signUpNameError = document.getElementById('fullNameError');
const signUpEmailError = document.getElementById('emailError');
const signUpPasswordError = document.getElementById('passwordError');
const signUpSuccess = document.getElementById('hs');

document.getElementById('s').onclick = function () {
  const nameValid = validateField(signUpName, NAME_PATTERN, signUpNameError, 'Name must be at least 4 letters.');
  const emailValid = validateField(signUpEmail, EMAIL_PATTERN, signUpEmailError, 'Email must be in the format name@domain.com');
  const passwordValid = validateField(signUpPassword, PASSWORD_PATTERN, signUpPasswordError, 'Password must be at least 8 characters long.');

  if (!nameValid || !emailValid || !passwordValid) {
    return;
  }

  const users = getUsers();
  const email = signUpEmail.value.trim().toLowerCase();

  if (users[email]) {
    showError(signUpEmailError, 'This email is already registered.');
    return;
  }

  users[email] = { name: signUpName.value.trim(), password: signUpPassword.value };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  signUpSuccess.textContent = 'Registration successful, you can sign in now.';
};

const signInEmail = document.getElementById('le');
const signInPassword = document.getElementById('lp');
const signInEmailError = document.getElementById('lError');
const signInPasswordError = document.getElementById('llError');

document.getElementById('l').onclick = function () {
  showError(signInEmailError, '');
  showError(signInPasswordError, '');

  const user = getUsers()[signInEmail.value.trim().toLowerCase()];

  if (!user) {
    showError(signInEmailError, 'This email is not registered.');
    return;
  }

  if (user.password !== signInPassword.value) {
    showError(signInPasswordError, 'Invalid password.');
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user.name));
  window.location.href = 'content.html';
};
