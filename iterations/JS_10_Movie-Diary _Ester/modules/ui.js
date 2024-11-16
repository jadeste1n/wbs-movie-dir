//import addToFavorites function from storage
import { addToFavorites } from './storage.js';

//Declarations
const editButton = document.getElementById('edit'); 
const saveButton = document.getElementById('save'); 
//const inputNote = document

// Create a product card
export function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg overflow-hidden';
  
    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    image.alt = movie.original_title;
    image.className = 'w-full h-48 object-cover';
  
    const cardBody = document.createElement('div');
    cardBody.className = 'p-6 flex flex-col';
  
    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold truncate';
    title.textContent = movie.original_title;
    
    const rating = document.createElement('div');
    rating.className = 'flex';
    rating.innerHTML = `<i class="fa-solid fa-star pr-2"></i>`

    const popularity = document.createElement('p');
    popularity.className = 'text-gray-700 ';
    popularity.textContent = `${movie.vote_average}`;

    const votes = document.createElement('p');
    votes.className = 'text-gray-700 pl-2';
    votes.textContent = `(${movie.vote_count} People) `;
  
    const addButton = document.createElement('button');
    addButton.className = 'bg-blue-500 text-white px-4 py-2 mt-2 rounded';
    addButton.textContent = 'Add to Favorites';
    addButton.type = 'button';
    addButton.onclick = () => addToFavorites(movie);
  
    cardBody.appendChild(title);
    cardBody.appendChild(rating);
    rating.appendChild(popularity);
    rating.appendChild(votes);
    cardBody.appendChild(addButton);
    card.appendChild(image);
    card.appendChild(cardBody);
  
    return card;
  }

  // Create a product card
  export function createMovieCard_detail(favorite) {
  const card = createMovieCard(favorite);

  const wrapper = document.createElement('div');
  wrapper.classList.add('mt-2', 'p-6');

  const txtArea = document.createElement('textarea');
  txtArea.setAttribute('disabled', true);
  txtArea.setAttribute('id', `note-input-${favorite.id}`);
  txtArea.setAttribute('placeholder', 'Add a note...');
  txtArea.value = favorite.note || '';
  txtArea.className = 'mt-2 w-full border-gray-800 rounded-md hover:bg-violet-600';  


  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Note';
  editBtn.className = 'bg-gray-500 text-white px-4 py-2 mt-2 mr-2 rounded';  

  editBtn.addEventListener('click', () => {
    txtArea.removeAttribute('disabled');
  })

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Note';
  saveBtn.className = 'bg-blue-500 text-white px-4 py-2 mt-2 ml-2 rounded';  


  saveBtn.addEventListener('click', () => {
    txtArea.setAttribute('disabled', true);
  })

    wrapper.appendChild(txtArea)
    wrapper.appendChild(editBtn)
    wrapper.appendChild(saveBtn)
    card.appendChild(wrapper)

    return card;
}




// Create a Search Result Container
export function createSearchResultContainer(movie) {
    const container = document.createElement('div');
    container.className = 'bg-sky-100 rounded-lg overflow-hidden';

    return container

};
