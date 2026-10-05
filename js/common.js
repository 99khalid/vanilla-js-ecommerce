// Shared helpers used by every page: cart storage, logged-in user and header widgets.

const CART_KEY = 'myArray';
const USER_KEY = 'user';
const SELECTED_PRODUCT_KEY = 'ob';

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function getCart() {
  return readJson(CART_KEY, []);
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('badge');
  if (badge) {
    badge.textContent = getCart().length;
  }
}

function showLoggedInUser() {
  const userName = readJson(USER_KEY, '');
  const userLabel = document.getElementById('us') || document.getElementById('uss');
  if (userLabel) {
    userLabel.textContent = userName;
  }
}

function setupUserMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const menu = document.getElementById('menu');
  if (menuIcon && menu) {
    menuIcon.addEventListener('click', (event) => {
      event.preventDefault();
      menu.classList.toggle('hidden');
    });
  }
}

updateCartBadge();
showLoggedInUser();
setupUserMenu();
