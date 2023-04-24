// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function onSuccess(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

function onFailure() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function info() {
  Notify.info('We are sorry, but you have reached the end of search results.');
}

export { onSuccess, onFailure, info };
