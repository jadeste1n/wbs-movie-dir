//import the fetch function
import { fetchMovies } from "./modules/network.js"; //you need to use the .js file type in the file path
import { fetchMovieSearched } from "./modules/network.js"; 

//import the createMovieCard function
import { createMovieCard } from './modules/ui.js';
//import { createSearchResultContainer } from './modules/ui.js';

const productContainer = document.getElementById('movie-list'); // get the movie List from html = product Container
const body = document.querySelector('body');

// Fetch products and display them on page load -> network data
//When the page finishes loading
window.addEventListener('load', async () => {
    try { // try catch does error prevention
      
      const movies = await fetchMovies(); //function only resumes with rest of code if the promise settles
       
      //if movies was correctly settled
      //for each movie out of array 'movies'
      movies.forEach(movie => {
        const productCard = createMovieCard(movie); //Each movie item retrieved by fetchMovies() is passed to createMovieCard(movie)
        productContainer.appendChild(productCard); // add this Product card to the product Conntainer from out html
      });
    } catch (error) {
      console.error(error); //Error Handling: If fetching or appending fails, the error is logged to the console.
    }
  });


  //Search for Movies
  
  //Get Button + Input Field from HTML
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('userInput'); // Ester: add this outside, -> only define it once

  const searchForm = document.getElementById('search-form') // submit only works on form ! not button

  //1. When the search button is clicked, retrieve the input value from the search bar.
  //Add an event listener to the search button to handle search submissions.
  searchForm.addEventListener ("submit", async function (event) { // add the async to allow await, form = submit instead of click because its a form!
    event.preventDefault(); // Prevent Page Load with button Click
    // console.dir(searchInput); //TEST logs elements properties & values -> see input object
    const userInput = searchInput.value.trim();  //Get the value from the Input Field every time with button Click and tranform it to add it to the url

      if (userInput) { // In case of user Input
        try {
          productContainer.innerHTML = 'Loading...'//UX: add visual clue for user, what is happening, in case of long loading times
          //B. Get the Seacrh Results:  https://developer.themoviedb.org/reference/search-movie
          //function fetchMovieSearched takes variable userInput within
          const movies = await fetchMovieSearched(userInput); //function only resumes with rest of code if the promise settles + you need to pass the UserInput value to the function
          productContainer.innerHTML = ''; // clear product container before search results are shown

          // Display each movie from search results
          movies.forEach(movie => {
            const productCard = createMovieCard(movie); //Each movie item retrieved by fetchMovies() is passed to createMovieCard(movie)
            productContainer.appendChild(productCard); // Append to searchContainer
          });
        } catch (error) {
          productContainer.innerHTML = 'Uh oh, something went wrong' // for UX: add visual clue for user
          console.error("Search error:", error);
        }
      } else {
        console.log("Enter a search term.");
      }

  });
  

  