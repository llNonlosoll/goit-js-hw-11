// Плавне прокручування сторінки

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: 0,
    behavior: 'smooth',
  });
}

export { onScroll };
