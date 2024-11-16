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
  const card = document.createElement('div');
  card.className = 'bg-white shadow-md rounded-lg overflow-hidden';

  const image = document.createElement('img');
  image.src = `https://image.tmdb.org/t/p/original/${favorite.poster_path}`;
  image.alt = favorite.original_title;
  image.className = 'w-full h-48 object-cover';

  const cardBody = document.createElement('div');
  cardBody.className = 'p-6 flex flex-col';

  cardBody.innerHTML = `
        <h2 class="text-lg font-semibold truncate">${favorite.original_title}</h2>
        <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-500 pr-2"></i> ${favorite.vote_average}
            <span class="pl-2 text-gray-600">(${favorite.vote_count} votes)</span>
        </div>
        <div class="mt-2">
            <!--<p><strong>Note:</strong> ${favorite.note || 'No notes added yet.'}</p>-->
            <textarea disabled id="note-input-${favorite.id}" class="mt-2 w-full border-gray-800 rounded-md hover:bg-violet-600" placeholder="Add a note...">${ favorite.note||''}</textarea>
            <button onclick="edit()" class="bg-gray-500 text-white px-4 py-2 mt-2 rounded" onclick="saveNoteForFavorite(${JSON.stringify(favorite)})">
               Edit Note
            </button>
            <button onclick="edit()" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onclick="saveNoteForFavorite(${JSON.stringify(favorite)})">
                Save Note
            </button>

        </div>
    `;

    card.append(image, cardBody);
    return card;
}




// Create a Search Result Container
export function createSearchResultContainer(movie) {
    const container = document.createElement('div');
    container.className = 'bg-sky-100 rounded-lg overflow-hidden';

    return container

};
