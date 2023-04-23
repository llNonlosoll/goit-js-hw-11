import axios from 'axios';

// Функція запиту на сервер

const API_KEY = '35695662-2f1aa19a2cfb13ed0e26200f2';

async function fetchImages(name, page) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${name}
  &image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  const response = await axios.get(`${url}`);

  return response.data;
}

export { fetchImages };
