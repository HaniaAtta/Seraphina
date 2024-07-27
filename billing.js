// Get references to elements
const billingForm = document.getElementById('billing-form');
const cartSummary = document.getElementById('cart-summary');
const completeOrderButton = document.getElementById('complete-order');
const cartItems = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');

// Get cart from local storage
const cart = JSON.parse(localStorage.getItem('cart'));

// Display cart items
let totalAmount = 0;
Object.values(cart).forEach(item => {
  const cartItem = document.createElement('li');
  cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}" width="50" height="50">
    <h3>${item.name}</h3>
    <p>Price: ${item.price}</p>
    <p>Quantity: ${item.quantity}</p>
  `;
  cartItems.appendChild(cartItem);

  const priceString = item.price.replace('PKR ', ''); 
  const priceRegex = /\d+(\.\d+)?/; 
  const priceMatch = priceString.match(priceRegex);
  let priceAsNumber = 0;
  if (priceMatch) {
    priceAsNumber = parseFloat(priceMatch[0]); 
  } else {
    console.error(`Invalid price format for ${item.name}`);
  }
  console.log(`Price as number: ${priceAsNumber}`);
  totalAmount += priceAsNumber * item.quantity;
});

const deliveryCharges = 200;
const totalAmountWithDelivery = totalAmount + deliveryCharges;

totalAmountElement.innerHTML = `
  <p>Subtotal: PKR ${totalAmount.toFixed(2)}</p>
  <p>Delivery Charges: PKR ${deliveryCharges}</p>
  <p>Total Amount: PKR ${totalAmountWithDelivery.toFixed(2)}</p>
`;

function checkFormValidity() {
  const formElements = billingForm.elements;
  let isValid = true;
  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    if (element.required && element.value.trim() === '') {
      isValid = false;
      break;
    }
  }
  return isValid;
}

function updateCompleteOrderButtonState() {
  if (checkFormValidity()) {
    completeOrderButton.removeAttribute('disabled');
  } else {
    completeOrderButton.setAttribute('disabled', 'disabled');
  }
}

billingForm.addEventListener('change', updateCompleteOrderButtonState);

updateCompleteOrderButtonState();

function completeOrder(event) {
  event.preventDefault();

  if (!checkFormValidity()) {
    alert('Please fill all the fields before completing the order.');
    return;
  }

  // Get form data
  const name = document.getElementById('names').value;
  const email = document.getElementById('emails').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const province = document.getElementById('province').value;
  const country = document.getElementById('country').value;
  const zip = document.getElementById('zip').value;
  const paymentMethod = document.getElementById('payment-method').value;

  // Generate order number
  const orderNumber = Math.floor(Math.random() * 1000000);

  // Create modal popup HTML
  const modalHTML = `
    <div id="order-modal" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h2>Order Confirmed!</h2>
        <p class="p1">Your order has been successfully placed. Your order number is: ${orderNumber}</p>
        <p class="p1">We will send you an email with the order details.</p>
        <p class="p2"><b>Order Summary:</b></p>
        <ul id="order-summary"></ul>
        <p>You can cancel your order within 12 hours by calling us at 0300-1234567 with your order number.</p>
        <button id="close-modal">Close</button>
      </div>
    </div>
  `;

  // Add modal popup to page
  const modal = document.createElement('div');
  modal.innerHTML = modalHTML;
  document.body.appendChild(modal);

 // Display order summary
  const orderSummary = document.getElementById('order-summary');
  Object.values(cart).forEach((item, index) => {
    const orderItem = document.createElement('li');
    orderItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50" height="50">
      <h3>${item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;
    orderSummary.appendChild(orderItem);
    if ((index + 1) % 3 === 0) { // add a line break after every 3 items
      const lineBreak = document.createElement('br');
      orderSummary.appendChild(lineBreak);
    }
  });

  const totalAmountElement = document.createElement('li');
  totalAmountElement.className = 'total-amount';  
  totalAmountElement.innerHTML = `
    <p>  <span>Subtotal: Pkr    ${totalAmount.toFixed(2)}        </span></p>
    <p> <span><b>Delivery Charges:</b>   Pkr     ${deliveryCharges}          </span></p>
    <p> <span><b>Total Amount:</b>   Pkr   ${totalAmountWithDelivery.toFixed(2)}               </span></p>
  `;
  orderSummary.appendChild(totalAmountElement);

  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', () => {
    modal.remove();
    window.location.href = 'index.html'; 
  });
}

























