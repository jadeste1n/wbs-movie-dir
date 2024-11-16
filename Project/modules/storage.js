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
  return favoriteList;
}