// Product details page: shows the product picked on the list page and adds it to the cart.

function renderProductDetails(product) {
  const container = document.createElement('div');
  container.id = 'containerD';

  const imageSection = document.createElement('div');
  imageSection.id = 'imageSection';

  const mainImage = document.createElement('img');
  mainImage.id = 'imgDetails';
  mainImage.src = product.thumbnail;
  mainImage.alt = product.title;
  imageSection.appendChild(mainImage);

  const productDetails = document.createElement('div');
  productDetails.id = 'productDetails';

  const title = document.createElement('h1');
  title.textContent = product.title;

  const brand = document.createElement('h4');
  brand.textContent = product.brand || '';

  const details = document.createElement('div');
  details.id = 'details';

  const price = document.createElement('h3');
  price.textContent = '$ ' + product.price;

  const descriptionTitle = document.createElement('h3');
  descriptionTitle.textContent = 'Description';

  const description = document.createElement('p');
  description.textContent = product.description;

  details.append(price, descriptionTitle, description);

  const preview = document.createElement('div');
  preview.id = 'productPreview';

  const previewTitle = document.createElement('h3');
  previewTitle.textContent = 'Product Preview (rating: ' + product.rating + ')';
  preview.appendChild(previewTitle);

  for (const imageUrl of product.images) {
    const previewImage = document.createElement('img');
    previewImage.id = 'previewImg';
    previewImage.src = imageUrl;
    previewImage.onclick = function () {
      mainImage.src = imageUrl;
    };
    preview.appendChild(previewImage);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.id = 'button';

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.onclick = function () {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
  };
  buttonWrapper.appendChild(addToCartButton);

  productDetails.append(title, brand, details, preview, buttonWrapper);
  container.append(imageSection, productDetails);
  document.getElementById('containerProduct').appendChild(container);
}

const selectedProduct = readJson(SELECTED_PRODUCT_KEY, null);

if (selectedProduct) {
  renderProductDetails(selectedProduct);
} else {
  window.location.href = 'content.html';
}
