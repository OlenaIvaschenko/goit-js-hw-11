//
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '49441888-9a9fca759a65c9c8b8f6579f2';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const loader = document.querySelector('.loader'); // Додаємо селектор для індикатора завантаження

export async function fetchImages(query) {
  try {
    loader.style.display = 'block'; // Показуємо індикатор завантаження

    const response = await axios.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    loader.style.display = 'none'; // Сховуємо індикатор завантаження

    if (response.data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    clearGallery(); // Очищаємо галерею перед рендерингом нових зображень
    renderGallery(response.data.hits); // Рендеримо нові зображення
  } catch (error) {
    loader.style.display = 'none'; // Якщо сталася помилка
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  }
}

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очищаємо галерею
}

function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очищаємо старі результати

  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}" class="gallery-link">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              class="gallery-image"
              loading="lazy"
            />
          </a>
          <div class="image-info">
            <p><strong>Likes:</strong> ${image.likes}</p>
            <p><strong>Views:</strong> ${image.views}</p>
            <p><strong>Comments:</strong> ${image.comments}</p>
            <p><strong>Downloads:</strong> ${image.downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');

  gallery.innerHTML = markup; // Додаємо нову розмітку у галерею

  // Ініціалізація SimpleLightbox після додавання нових зображень
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
