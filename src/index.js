// Імпортуємо фунції
import { refs } from './js/refs';
import { fetchImages } from './js/fetchImages';
import { createMarkup } from './js/createMarkup';
import { cleanMarkup } from './js/cleanMarkup';

// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

// Робимо кнопку "loadMore" невідимою за замовченням
refs.loadMore.setAttribute('hidden', true);

//Функція для пошуку зображень при "submit"
function onSubmit(event) {
  event.preventDefault();
  name = refs.form.elements.searchQuery.value.trim();
  page = 1;

  fetchImages(name).then(images => {
    totalPages = Math.ceil(images.totalHits / per_page);

    if (totalPages > 1) {
      refs.loadMore.removeAttribute('hidden');
    }

    if (images.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (images.hits.length > 0) {
      cleanMarkup(refs.gallery);
      refs.gallery.innerHTML = createMarkup(images);
    }
  });
}

function onClick() {
  page += 1;

  if (page === totalPages) {
    refs.loadMore.setAttribute('hidden', true);
    Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
  }

  fetchImages(name, page).then(images => {
    cleanMarkup(refs.gallery);
    refs.gallery.innerHTML = createMarkup(images);
  });
}

function onInput(event) {
  if (event.target.value === '') {
    cleanMarkup(refs.gallery);
    refs.loadMore.setAttribute('hidden', true);
  }
}

// function onInput() {

// fetchCountries(name)
//   .then(countries => {
//     cleanMarkup(refs.list);
//     cleanMarkup(refs.about);
//     if (countries.length === 1) {
//       refs.about.innerHTML = createCountryMarkup(countries);
//     } else if (countries.length <= 10) {
//       refs.list.innerHTML = createMarkup(countries);
//     } else {
//       Notify.info(
//         'Too many matches found. Please enter a more specific name.'
//       );
//     }
//   })
//     .catch(error => {
//       if (error.message === '404') {
//         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//       }
//       cleanMarkup(refs.list);
//       cleanMarkup(refs.about);
//     });
// }

// if (name === '') {
//   cleanMarkup(refs.gallery);
//   refs.loadMore.setAttribute('hidden', true);
// }
