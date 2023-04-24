// Плавне прокручування сторінки

function onRequest() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onLoadMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export { onRequest, onLoadMore };
