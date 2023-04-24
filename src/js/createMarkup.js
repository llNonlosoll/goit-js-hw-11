// Функція створення розмітки для списку країн
import { refs } from './refs';

function createMarkup(images) {
  const makeImg = images.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery-link" href="${largeImageURL}">
          <div class="photo-card">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes: </b>${likes}</p>
              <p class="info-item"><b>Views: </b>${views}</p>
              <p class="info-item"><b>Comments: </b>${comments}</p>
              <p class="info-item"><b>Downloads: </b>${downloads}</p>
            </div>
          </div>
        </a>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeEnd', makeImg);
}

export { createMarkup };
