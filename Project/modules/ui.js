//import addToFavorites function from storage
import { addToFavorites } from './storage.js';
import { removeFromFavorites } from './storage.js';
import { isFavoriteFunction } from './storage.js';

//Declarations
const editButton = document.getElementById('edit'); 
const saveButton = document.getElementById('save'); 


// Create a product card
export function createMovieCard(movie, isItFavorite = false) { //default is isItFavorite is false
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
   // Check if the movie is in favorites and set the initial button text
  const isFavorite = isFavoriteFunction(movie);
  addButton.textContent = isFavorite ? 'Added to Favorites' : 'Add to Favorites';
  addButton.type = 'button';
  addButton.onclick = () => {
      addToFavorites(movie); 
      if (isFavoriteFunction(movie)) {
        removeFromFavorites(movie);
        addButton.textContent = 'Add to Favorites';
      } else {
        addToFavorites(movie);
        addButton.textContent = 'Added to Favorites';
      }// add click event like this (not through inner html -> otherwise issues can occur because element is not created from beginning)
    }
    cardBody.appendChild(title);
    cardBody.appendChild(rating);
    rating.appendChild(popularity);
    rating.appendChild(votes);
    !isItFavorite ? //If its not a favorite, add btn
      cardBody.appendChild(addButton):
      null;
    card.appendChild(image);
    card.appendChild(cardBody);
  
    return card;
  }

  // Create product cards for favorites
  export function createMovieCard_detail(favorite) {
    const card = createMovieCard(favorite, true); // reuse the function to create the card layout but without the button

  //Does not work -> create it step by step
  /*cardBody.innerHTML = `
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
    `;*/
    
    //create a wrapper for new elements added to moviecard Layout
    const wrapper = document.createElement('div');
    wrapper.classList.add('mt-2', 'p-6');
  
    //create the new elements
    //1. textarea
    const txtArea = document.createElement('textarea');
    txtArea.setAttribute('disabled', true); // disable the textarea
    txtArea.setAttribute('id', `note-input-${favorite.id}`);
    txtArea.setAttribute('placeholder', 'Add a note...'); //set a placeholder text
    txtArea.value = favorite.note || ''; //If favorite is an object, favorite.note retrieves the value of the note property. 
    txtArea.className = 'mt-2 w-full border-gray-800 rounded-md hover:bg-violet-600';  
  
    //add buttons to control text area
    //edit:
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit Note';
    editBtn.className = 'bg-blue-500 text-white px-4 py-2 mt-2 mr-2 rounded';  
    editBtn.addEventListener('click', () => { // if clicked, remove disable attribute -> make text editable
      txtArea.removeAttribute('disabled');
      //txtArea.classList.remove('text-[#6b7280]');
    })
  
    //save:
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Note';
    saveBtn.className = 'bg-blue-500 text-white px-4 py-2 mt-2 ml-2 rounded';  
    saveBtn.addEventListener('click', () => {
      txtArea.setAttribute('disabled', true); //if clicked, add attribute disable again
      //txtArea.classList.add('text-[#6b7280]');
    })

    //remove Favorite
    const removeButton = document.createElement('button');
    removeButton.className = 'bg-blue-500 text-white px-4 py-2 mt-2 rounded';
    removeButton.textContent = 'Remove from Favorites';
    removeButton.type = 'button';
    removeButton.onclick = () => removeFromFavorites(favorite); 
  
    //add new elements to page
      wrapper.appendChild(txtArea)
      wrapper.appendChild(editBtn)
      wrapper.appendChild(saveBtn)
      wrapper.appendChild(removeButton)
      card.appendChild(wrapper)
    
    return card;
}

// Create a Search Result Container

export function createSearchResultContainer(movie) {
    const container = document.createElement('div');
    container.className = 'bg-sky-100 rounded-lg overflow-hidden';

    return container
};