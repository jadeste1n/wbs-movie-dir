// Fetch Movies from API

export async function fetchMovies() {
  try {
    //Fetch Request with header from the api: https://developer.themoviedb.org/reference/movie-popular-list
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmE1NDBlM2ZiOWJkMWY1YjY0ZDE3ZWQyMmUxZWZkYyIsIm5iZiI6MTczMTE0MTUwNC40MTk3Nzk1LCJzdWIiOiI2NzJmMWVkOWM4MDQzMWY3MTY3YzMxYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t1BrS_bZR3a8wjOOl5_dT8qumSCtNI3Kfv3sduAlxTU'
      }
    };

    // Send a request to the movie database API to get popular movies Array
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);


    //Error Handling with try & catch:
    // Check if the response status is not OK (e.g., 404 or 500)
    // If not, throw an error with the status code and message
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON to get the movies data
    const movies = await response.json();

    // Log the movies data to verify it has been fetched correctly
    console.log(movies);

    // Return the movies data to be used elsewhere in the application
    return movies.results;
  } catch (error) {
    // If there's an error during the fetch or JSON parsing, log it to the console
    console.error("Failed to fetch movies:", error);
  }
}

//Fetch for search
export async function fetchMovieSearched(userInput) {
  try {

    //options for API header
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmE1NDBlM2ZiOWJkMWY1YjY0ZDE3ZWQyMmUxZWZkYyIsIm5iZiI6MTczMTE0MTUwNC40MTk3Nzk1LCJzdWIiOiI2NzJmMWVkOWM4MDQzMWY3MTY3YzMxYTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t1BrS_bZR3a8wjOOl5_dT8qumSCtNI3Kfv3sduAlxTU'
      }
    };

    //Fetch request for data
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`, options)

    // Check if the response status is not OK (e.g., 404 or 500)
    // If not, throw an error with the status code and message
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON to get the movies data
    const moviesSearch = await response.json();

    // Return the movies data to be used elsewhere in the application
    return moviesSearch.results;
  } catch (error) {
    // If there's an error during the fetch or JSON parsing, log it to the console
    console.error("Failed to fetch searched movies:", error);
  }
}
