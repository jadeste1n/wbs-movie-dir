
window.addToFavorites = function(movie) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
 
    if (!favorites.some(fav => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    } else {
        alert('Movie is already in favorites!');
    }
};

async function fetchMovies(searchQuery = '') {
    const apiKey = '7ba540e3fb9bd1f5b64d17ed22e1efdc';
    const endpoint = searchQuery 
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'bg-white shadow-md rounded-lg overflow-hidden';

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    image.alt = movie.original_title;
    image.className = 'w-full h-48 object-cover';

    const cardBody = document.createElement('div');
    cardBody.className = 'p-6 flex flex-col';

    cardBody.innerHTML = `
        <h2 class="text-lg font-semibold truncate">${movie.original_title}</h2>
        <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-star text-yellow-500 pr-2"></i> ${movie.vote_average}
            <span class="pl-2 text-gray-600">(${movie.vote_count} votes)</span>
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600" 
                onclick='addToFavorites(${JSON.stringify(movie).replace(/'/g, "&apos;")})'>
            Add to Favorites
        </button>
    `;

    card.append(image, cardBody);
    return card;
}


document.addEventListener('DOMContentLoaded', async () => {
    const movieList = document.getElementById('movie-list');
    const searchForm = document.getElementById('search-form');
    const searchDialog = document.getElementById('search-dialog');
    const searchResults = document.getElementById('search-results');
    const closeDialog = document.getElementById('close-dialog');


    try {
        const movies = await fetchMovies();
        movies.forEach(movie => {
            const card = createMovieCard(movie);
            movieList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }


    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search-bar').value.trim();
        
        if (searchQuery) {
            try {
                const results = await fetchMovies(searchQuery);
                searchResults.innerHTML = '';
                
                if (results.length === 0) {
                    searchResults.innerHTML = '<p>No movies found.</p>';
                } else {
                    results.forEach(movie => {
                        const card = createMovieCard(movie);
                        searchResults.appendChild(card);
                    });
                }
                
                searchDialog.classList.remove('hidden');
            } catch (error) {
                console.error('Error searching movies:', error);
                alert('Error searching movies. Please try again.');
            }
        }
    });

    closeDialog.addEventListener('click', () => {
        searchDialog.classList.add('hidden');
    });
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const movieContainer = document.getElementById('movie-list');
    if (!movieContainer) {
      console.error('Movie list container not found!');
      return;
    }

    const movies = await fetchMovies();
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error loading movies:', error);
  }
});



  