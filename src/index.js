// Імпортуємо фунції
import { refs } from './js/refs';
import { fetchImages } from './js/fetchImages';
import { createMarkup } from './js/createMarkup';
import { cleanMarkup } from './js/cleanMarkup';
import { onScroll } from './js/scroll';
import { onSuccess, onFailure, info } from './js/notify';

// Імпорт стилів SimpleLightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів SimpleLightbox
import 'simplelightbox/dist/simple-lightbox.min.css';

// Імпорт debounce
import debounce from 'lodash.debounce';

// Змінна для зберігання часу затримки
const DEBOUNCE_DELAY = 1000;

// Додаємо слухачів подій
refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
refs.loadMore.addEventListener('click', onClick);

// Створюємо необхідні додаткові змінні
let page = 1;
let name = null;
let totalPages = 0;
const per_page = 40;
let simpleLightbox;

// Робимо кнопку "loadMore" невидимою за замовченням
refs.loadMore.setAttribute('hidden', true);

//Функція для пошуку зображень при "submit"
function onSubmit(event) {
  event.preventDefault();
  window.scrollTo({ top: 0 });
  refs.loadMore.setAttribute('hidden', true);
  name = refs.form.elements.searchQuery.value.trim();
  page = 1;

  fetchImages(name)
    .then(images => {
      totalPages = Math.ceil(images.totalHits / per_page);

      if (totalPages > 1) {
        refs.loadMore.removeAttribute('hidden');
      }

      if (images.hits.length === 0) {
        cleanMarkup(refs.gallery);
        refs.loadMore.setAttribute('hidden', true);
        onFailure();
      } else {
        cleanMarkup(refs.gallery);
        createMarkup(images);
        onScroll();
        simpleLightbox = new SimpleLightbox('.gallery a').refresh();
        onSuccess(images.totalHits);
      }
    })
    .catch(error => {
      console.log(error);
      cleanMarkup(refs.gallery);
    });
}

// Функція для загрузки наступної сторінки з фото
function onClick() {
  page += 1;
  simpleLightbox.destroy();

  if (page === totalPages) {
    refs.loadMore.setAttribute('hidden', true);
    info();
  }

  fetchImages(name, page)
    .then(images => {
      createMarkup(images);
      simpleLightbox = new SimpleLightbox('.gallery a').refresh();
    })
    .catch(error => {
      console.log(error);
      cleanMarkup(refs.gallery);
    });

  onScroll();
}

//Функція для очистки DOM при порожньому "input"
function onInput(event) {
  if (event.target.value === '') {
    cleanMarkup(refs.gallery);
    refs.loadMore.setAttribute('hidden', true);
  }
}
