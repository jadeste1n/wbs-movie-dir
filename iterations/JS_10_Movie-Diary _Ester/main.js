//import the fetch function
import { fetchMovies } from "./modules/network.js"; //you need to use the .js file type in the file path
import { fetchMovieSearched } from "./modules/network.js"; 

//import the createMovieCard function
import { createMovieCard } from './modules/ui.js';
import { createSearchResultContainer } from './modules/ui.js';

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
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('userInput');

  searchForm.addEventListener ("submit", async function (event) { // add the async to allow await
    event.preventDefault(); // Prevent Page Load with button Click
    const userInput = searchInput.value.trim();  

    if(userInput){
      try{
        productContainer.innerHTML = 'Loading...'
        const movies = await fetchMovieSearched(userInput);
        productContainer.innerHTML = '';
        movies.forEach(movie => {
          const productCard = createMovieCard(movie); //Each movie item retrieved by fetchMovies() is passed to createMovieCard(movie)
          productContainer.appendChild(productCard); // add this Product card to the product Conntainer from out html
        });

      }catch(err) {
        productContainer.innerHTML = 'Uh oh, something went wrong'
        console.error(err);
      }
    }
  })


  // //1. When the search button is clicked, retrieve the input value from the search bar.
  // //Add an event listener to the search button to handle search submissions.
  // searchForm.addEventListener ("submit", async function (event) { // add the async to allow await
  //   event.preventDefault(); // Prevent Page Load with button Click

  //   //A. Get the User Input
  //   const searchInput = document.getElementById('userInput'); //Create variable for Input Field
  //   // console.dir(searchInput); //TEST logs elements properties & values -> see input object
  //   const userInput = searchInput.value.trim();     //Get the value from the Input Field every time with button Click and tranform it to add it to the url

    
  //   //create the Search Container & append it to the Site
  //   const searchContainer = createSearchResultContainer();
  //   productContainer.appendChild(searchContainer);

  //     if (userInput !== '') {
  //       try {
  //         //B. Get the Seacrh Results:  https://developer.themoviedb.org/reference/search-movie
  //         //function fetchMovieSearched takes variable userInput within
  //         const movies = await fetchMovieSearched(userInput); //function only resumes with rest of code if the promise settles

  //         // Create search container for results
  //         const searchContainer = createSearchResultContainer();
  //         body.insertBefore(searchContainer, productContainer );
    
  //         // Display each movie from search results

  //         movies.forEach(movie => {
  //           const productCard = createMovieCard(movie);
  //           searchContainer.appendChild(productCard); // Append to searchContainer
  //         });
  //       } catch (error) {
  //         console.error("Search error:", error);
  //       }
  //     } else {
  //       console.log("Enter a search term.");
  //     }

  // });
  

  