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
if (cartIcon) {
  cartIcon.addEventListener('click', showCart);
}

// Add event listener to close cart
cartClose.addEventListener('click', closeCart);

document.addEventListener('click', function(event) {
  if (!event.target.closest('#cart-container') && !event.target.classList.contains('nav__actions') && event.target.id !== 'cart') {
    cartContainer.classList.remove('show-cart');
    cartContainer.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});

let productIdCounter = 1;

function addToCart(event) {
  console.log('Add to cart function called');
  const productInfo = event.target.closest('.product-info');
  let productName = '';
  let productPrice = '';
  let productImage = '';

  const productNameElement = productInfo.querySelector('h1');
  if (productNameElement) {
    productName = productNameElement.textContent;
  } else {
    console.error('Could not find product name element');
  }

  const productPriceElement = productInfo.querySelector('p:nth-child(4)');
  if (productPriceElement) {
    productPrice = productPriceElement.textContent;
  } else {
    console.error('Could not find product price element');
  }

  const productImageElement = productInfo.parentNode.querySelector('img');
  if (productImageElement) {
    productImage = productImageElement.src;
  } else {
    console.error('Could not find product image element');
  }

  const quantityInput = document.getElementById('quantity');
  let quantity = parseInt(quantityInput.value);

  if (productName && productPrice && productImage) {
    console.log(`Product Name: ${productName}`);
    console.log(`Product Price: ${productPrice}`);
    console.log(`Product Image: ${productImage}`);

    const productId = productName; 
    if (!cart[productId]) {
      cart[productId] = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        image: productImage
      };
    } else {
      cart[productId].quantity += quantity;
    }

    console.log('Cart:', cart);

    updateCartCount(); // Update cart count immediately
  } else {
    console.error('Could not add product to cart');
  }
}

// Update cart count function
function updateCartCount() {
  const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// Show cart function
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
  
    // Iterate through each item in the cart and display it
    Object.values(cart).forEach(item => {
      console.log(`Processing item: ${item.name}`);
      console.log(`Item price: ${item.price}`);
  
      const cartItem = document.createElement('li');
      cartItem.className = 'cart-item';
      cartItem.dataset.productId = item.name; 
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" >
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <div style="display: flex; flex-wrap: wrap;">
        <button class="increase-quantity" style="margin-left:20px;">+</button>
        <p> <span class="quantity" style="font-size:25px;">${item.quantity}</span></p>
        
        
        <button class="remove-from-cart">-</button>
        </div>


      `;
  
      cartList.appendChild(cartItem);
  
      // Extract the numeric part of the price string using a regular expression
      const priceRegex = /\d+(\.\d+)?/; 
      const priceMatch = item.price.match(priceRegex);
      let priceAsNumber = 0;
      if (priceMatch) {
        priceAsNumber = parseFloat(priceMatch[0]); // Convert the matched price string to a number
      } else {
        console.error(`Invalid price format for ${item.name}`);
      }
  
      console.log(`Price as number: ${priceAsNumber}`);
  
      if (!isNaN(priceAsNumber)) { // Check if priceAsNumber is a valid number
        totalAmount += priceAsNumber * item.quantity;
      } else {
        console.error(`Invalid price format for ${item.name}`);
      }
    });
  
    const totalAmountElement = document.createElement('p');
  totalAmountElement.style.color = 'hsl(38, 51%, 59%)';

    totalAmountElement.textContent = `Total Amount: PKR ${totalAmount}`; // Format the total amount with two decimal places
    cartContainer.appendChild(totalAmountElement);

  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Proceed to Checkout';
  checkoutButton.className = 'proceed-to-checkout';
  cartContainer.appendChild(checkoutButton);

  // Add event listener for checkout button
  checkoutButton.addEventListener('click', proceedToCheckout);


// Add event listeners for remove and increase quantity buttons 
document.querySelectorAll('.remove-from-cart').forEach(button => { button.addEventListener('click', removeFromCart); });

document.querySelectorAll('.increase-quantity').forEach(button => { button.addEventListener('click', increaseQuantity); });

// Show the cart container 
cartContainer.classList.add('show-cart'); cartContainer.classList.add('show'); document.body.style.overflow = 'hidden'; 
}

function removeFromCart(event) {
    event.stopPropagation(); 
    const cartItem = event.target.closest('.cart-item');
    const productName = cartItem.dataset.productId; 
    if (cart[productName]) {
      if (cart[productName].quantity > 1) {
        cart[productName].quantity -= 1;
      } else {
        delete cart[productName];
      }
      showCart(); 
    } else {
      console.error(`Product ${productName} not found in cart`);
    }
  }
  
  // Increase quantity function
  function increaseQuantity(event) {
    event.stopPropagation(); 
    const cartItem = event.target.closest('.cart-item');
    const productName = cartItem.dataset.productId; 
    if (cart[productName]) {
      cart[productName].quantity += 1;
      showCart(); 
    } else {
      console.error(`Product ${productName} not found in cart`);
    }
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
    if (Object.keys(cart).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = 'billing.html';
    } else {
      console.error('Cart is empty');
    }
  } 

  const quantityInput = document.getElementById('quantity');
const incrementBtn = document.querySelector('.increment-btn');
const decrementBtn = document.querySelector('.decrement-btn');

incrementBtn.addEventListener('click', () => {
  let currentValue = parseInt(quantityInput.value);
  currentValue++;
  quantityInput.value = currentValue;
});

decrementBtn.addEventListener('click', () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    currentValue--;
    quantityInput.value = currentValue;
  }
});