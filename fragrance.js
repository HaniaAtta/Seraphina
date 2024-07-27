console.log('Search script running...');
const searchInput = document.querySelector('.search__input');
const perfumeCards = document.querySelectorAll('.perfume-card');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCards = [];

  perfumeCards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    if (cardText.includes(searchTerm)) {
      card.style.display = 'block';
      filteredCards.push(card);
    } else {
      card.style.display = 'none';
    }
  });

  const noResultsElement = document.querySelector('.no-results');
  if (filteredCards.length === 0) {
    noResultsElement.style.display = 'block';
  } else {
    noResultsElement.style.display = 'none';
  }
});