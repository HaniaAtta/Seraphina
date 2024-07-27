console.log('JavaScript code running...');
  
const priceRange = document.getElementById('price-range');
const perfumCards = document.querySelectorAll('.perfume-card');

priceRange.addEventListener('input', () => {
  console.log('Range input event triggered...');
  const minValue = priceRange.value;
  document.getElementById('price-min').textContent = minValue;

  perfumCards.forEach((card) => {
    console.log('Processing card:', card);
    const priceText = card.querySelector('p').textContent;
    console.log('Price text:', priceText);
    const price = parseInt(priceText.replace('PKR ', ''));
    console.log('Parsed price:', price);
    if (price >= minValue && price <= priceRange.max) {
      console.log('Card matches filter:', card);
      card.style.display = 'block';
    } else {
      console.log('Card does not match filter:', card);
      card.style.display = 'none';
    }
  });
});