// Product list page: loads products from dummyjson.com, with search and category filter.

const PRODUCTS_URL = 'https://dummyjson.com/products';

const productList = document.getElementById('bb');
const searchInput = document.getElementById('input');
const searchButton = document.getElementById('button');
const categorySelect = document.getElementById('cars');

let allProducts = [];

function createProductCard(product) {
  const card = document.createElement('div');
  card.id = 'box';

  const link = document.createElement('a');
  link.href = 'contentDetails.html';
  link.onclick = function () {
    localStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify(product));
  };

  const image = document.createElement('img');
  image.src = product.thumbnail;
  image.alt = product.title;

  const details = document.createElement('div');
  details.id = 'details';

  const title = document.createElement('h3');
  title.textContent = product.title;

  const brand = document.createElement('h4');
  brand.textContent = product.brand || '';

  const price = document.createElement('h2');
  price.textContent = '$ ' + product.price;

  details.append(title, brand, price);
  link.append(image, details);
  card.appendChild(link);

  return card;
}

function renderProducts(products) {
  productList.innerHTML = '';
  for (const product of products) {
    productList.appendChild(createProductCard(product));
  }
}

function fillCategories(products) {
  const categories = [...new Set(products.map((product) => product.category))].sort();
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.replace(/-/g, ' ');
    categorySelect.appendChild(option);
  }
}

searchButton.onclick = function () {
  const text = searchInput.value.trim().toLowerCase();
  renderProducts(allProducts.filter((product) => product.title.toLowerCase().includes(text)));
};

categorySelect.onchange = function () {
  const category = categorySelect.value;
  if (category === 'all') {
    renderProducts(allProducts);
  } else {
    renderProducts(allProducts.filter((product) => product.category === category));
  }
};

fetch(PRODUCTS_URL + '?limit=0')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data.products;
    fillCategories(allProducts);
    renderProducts(allProducts);
  })
  .catch(() => {
    productList.textContent = 'Could not load products. Please try again later.';
  });
