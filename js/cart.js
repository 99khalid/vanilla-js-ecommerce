// Cart page: lists items in the cart, lets the user remove them and place the order.

const cartContainer = document.getElementById('cartContainer');
const totalItemsLabel = document.getElementById('totalItem');

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = '';
  totalItemsLabel.textContent = 'Total Items: ' + cart.length;

  const itemsContainer = document.createElement('div');
  itemsContainer.id = 'boxContainer';

  let totalAmount = 0;

  cart.forEach((product, index) => {
    totalAmount += product.price;

    const item = document.createElement('div');
    item.id = 'box';

    const image = document.createElement('img');
    image.src = product.thumbnail;
    image.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('h4');
    price.textContent = 'Price: $ ' + product.price;

    const removeButton = document.createElement('button');
    removeButton.id = 'aa';
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
      const updatedCart = getCart();
      updatedCart.splice(index, 1);
      saveCart(updatedCart);
      renderCart();
    };

    item.append(image, title, price, removeButton);
    itemsContainer.appendChild(item);
  });

  cartContainer.appendChild(itemsContainer);

  const totalContainer = document.createElement('div');
  totalContainer.id = 'totalContainer';

  const total = document.createElement('div');
  total.id = 'total';

  const totalTitle = document.createElement('h2');
  totalTitle.textContent = 'Total Amount';

  const totalValue = document.createElement('h4');
  totalValue.textContent = 'Amount: $ ' + totalAmount;

  const placeOrderButton = document.createElement('button');
  placeOrderButton.id = 'palce';
  placeOrderButton.textContent = 'Place Order';
  placeOrderButton.disabled = cart.length === 0;
  placeOrderButton.onclick = function () {
    window.location.href = 'orderPlaced.html';
  };

  total.append(totalTitle, totalValue, placeOrderButton);
  totalContainer.appendChild(total);
  cartContainer.appendChild(totalContainer);
}

renderCart();
