// Add Movie to localStorage
export function addToFavorites(movie) {
// 1. Retrieve the Existing Cart from localStorage
  // `localStorage.getItem('favorites')` retrieves the current cart data as a JSON string from localStorage.
  // `JSON.parse` converts this JSON string back into a JavaScript array.
  // If there's no existing cart data, we initialize `favorites` as an empty array (`|| []`).
    let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];

// 2. Add the New Movie to the Favorites Array
  // The `movie` object is added to the end of the `favorites` array.
    favoriteList.push(movie);

// 3. Save the Updated List Back to localStorage
  // `JSON.stringify(favorites)` converts the updated favorites array back into a JSON string.
  // `localStorage.setItem('favorites', ...)` saves this JSON string in localStorage with the key `'favorites'`.
    localStorage.setItem('favorites', JSON.stringify(favoriteList));
  }

//get Array of Favorites
export function getFavorites() {
  let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
  return favoriteList
}


export function isFavoriteFunction() {
  // checking if an item is a favorite
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some((item) => item.id === movie.id);
}


export function removeFromFavorites(movie) {
  // 1. Retrieve the Existing Cart from localStorage
    // `localStorage.getItem('favorites')` retrieves the current cart data as a JSON string from localStorage.
    // `JSON.parse` converts this JSON string back into a JavaScript array.
    // If there's no existing cart data, we initialize `favorites` as an empty array (`|| []`).
      let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
  

     // Find the index of the movie to remove
  const index = favoriteList.findIndex((item) => item.id === movie.id);

   // If the movie is found, remove it
   if (index !== -1) {
    favoriteList.splice(index, 1);
  }

      //update storage array -> stringify
      localStorage.setItem('favorites', JSON.stringify(favoriteList));

      window.location.reload();
    }
  
  