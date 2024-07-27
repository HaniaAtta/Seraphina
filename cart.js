
let cart = {};

// Get references to elements
const cartIcon = document.getElementById('cart');
const cartContainer = document.getElementById('cart-container');
const cartClose = document.getElementById('cart-close');

// Add event listener for adding to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', addToCart);
});

// Add event listener to show cart
const cartIcons = document.getElementById('cart');
if (cartIcon) {
  cartIcon.addEventListener('click', showCart);
}

// Add event listener to close cart
cartClose.addEventListener('click', closeCart);

document.addEventListener('click', function(event) {
  if (!event.target.closest('#cart-container') &&!event.target.classList.contains('nav__actions') && event.target.id!== 'cart') {
    cartContainer.classList.remove('show-cart');
    cartContainer.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

let productIdCounter = 1;


function addToCart(event) {
  console.log('Add to cart function called');
  const productName = event.target.parentNode.querySelector('h2').textContent;
  const productPrice = event.target.parentNode.querySelector('p').textContent;
  const productImage = event.target.parentNode.parentNode.querySelector('img').src;

  console.log(`Product Name: ${productName}`);
  console.log(`Product Price: ${productPrice}`);
  console.log(`Product Image: ${productImage}`);

  const productId = productName; 
  if (!cart[productId]) {
    cart[productId] = {
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage
    };
  } else {
    cart[productId].quantity += 1;
  }

  console.log('Cart:', cart);
  // Save cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); 
}

function updateCartCount() {
  const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

function showCart() {
  console.log('Show cart function called');
  cartContainer.innerHTML = ''; 

  const cartHeading = document.createElement('h2');
  cartHeading.textContent = 'Your Cart';
  cartHeading.setAttribute('style', 'color: white; font-size: 34px; font-weight: bold; text-align: center; margin-top:1rem; margin-bottom: 2rem;');
  cartContainer.appendChild(cartHeading);

  const cartList = document.createElement('ul');
  cartContainer.appendChild(cartList);

  let totalAmount = 0;

  Object.values(cart).forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.className = 'cart-item';
    cartItem.dataset.productId = item.name; 
    cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" width="100" height="100">
    <h3>${item.name}</h3>
    <p>Price: ${item.price}</p>
    <div style="display: flex; flex-wrap: wrap;">
    <button class="increase-quantity" style="margin-left:20px;">+</button>
    <p> <span class="quantity" style="font-size:25px;">${item.quantity}</span></p>
    
    
    <button class="remove-from-cart">-</button>
    </div>
  `;

    cartList.appendChild(cartItem);
  
    const priceAsNumber = parseFloat(item.price.replace('PKR ', '')); 
    totalAmount += priceAsNumber * item.quantity;
  });
  
  const totalAmountElement = document.createElement('p');
  totalAmountElement.style.color = 'hsl(38, 51%, 59%)';
  totalAmountElement.textContent = `Total Amount: PKR ${totalAmount.toFixed(2)}`; 
  cartContainer.appendChild(totalAmountElement);




  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = ' Checkout';
  checkoutButton.className = 'proceed-to-checkout';
  cartContainer.appendChild(checkoutButton);

  // Add event listener for checkout button
  checkoutButton.addEventListener('click', proceedToCheckout);
  // Add event listeners for remove and increase quantity buttons
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });

  // Show the cart container
  cartContainer.classList.add('show-cart');
  cartContainer.classList.add('show');
  document.body.style.overflow = 'hidden'; 
}

// Remove from cart function
function removeFromCart(event) {
  event.stopPropagation(); 
  const cartItem = event.target.closest('.cart-item');
  const productName = cartItem.dataset.productId; 
  if (cart[productName].quantity > 1) {
    cart[productName].quantity -= 1;
  } else {
    delete cart[productName];
  }
  showCart(); 
}

// Increase quantity function
function increaseQuantity(event) {
  event.stopPropagation(); 
  const cartItem = event.target.closest('.cart-item');
  const productName = cartItem.dataset.productId; 
  cart[productName].quantity += 1;
  showCart(); 
}
// Close cart function
function closeCart() {
  console.log('Close cart function called');
  cartContainer.classList.remove('show-cart');
  cartContainer.classList.remove('show');
  document.body.style.overflow = 'auto'; 
}
function proceedToCheckout() {
  console.log('Proceed to Checkout function called');
  console.log('Cart:', cart);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'billing.html';

}