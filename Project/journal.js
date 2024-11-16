//Imports
import { getFavorites } from "./modules/storage.js"; 
import { createMovieCard_detail } from './modules/ui.js';


//Declarations
const productContainer = document.getElementById('movie-list'); // get the movie List from html = product Container


//Code

//Add Carts with Data of Favorite Objects to HTML
//When the page finishes loading
window.addEventListener('load', () => {
      const movies = getFavorites(); //function only resumes with rest of code if the promise settles
      console.log(movies);

      // Check if movies array is not empty
  if (movies.length > 0) {
    // For each movie in the movies array
    movies.forEach((movie) => {
      const productCard = createMovieCard_detail(movie); // Create a card for each movie
      productContainer.appendChild(productCard); // Append the card to the product container
    });
  } else {
    const emptyList = document.createElement("p"); // Empty P Element
    emptyList.innerText ='No Favorites yet';
    productContainer.appendChild(emptyList); // Append the p to the product container
  }
  });

    //toggle disable state of Note field
     function edit(event){
        const thisTextarea = event.target.closest('textarea');
        thisTextarea.removeAttribute(disabled);
     };
      
    function save(event){
        const thisTextarea = event.target.closest('textarea');
        thisTextarea.addAttribute(disabled);
    };


    






