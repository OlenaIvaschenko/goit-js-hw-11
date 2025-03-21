// iziToast імпорт бібліотеки
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// SimpleLightbox імпорт бібліотеки
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconCross from '../src/img/icon/cross-min.png';
import fetchImages from './js/pixabay-api';

const form = document.querySelector('.form');
const loaderElement = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const errorMesage = {
  message:
    'Sorry, there are no images matching your search query.Please try again!',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconCross,
};
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }
  fetchImages(searchQuery);
});

function renderGallery(images) {
  const gallery = document.querySelector('.gallery'); // Знаходимо контейнер
  gallery.innerHTML = ''; // Очищаємо старі результати

  const markup = images
    .map(image => {
      return `
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        </a>`;
    })
    .join('');

  gallery.innerHTML = markup; // Додаємо HTML-код у контейнер галереї
}
