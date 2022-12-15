import axios from "axios";

const DTMN_API_URL = "http://127.0.0.1:3000";

export const getMovies = async (movie) => {
  const movieDB = axios.create({
    baseURL: "https://movie-database-alternative.p.rapidapi.com/",
    params: {
      s: `${movie}`,
      r: "json",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  });

  const response = await movieDB.get();
  return response.data.Search;
};

export const getDetailedMovie = async (movie) => {
  const movieDB = axios.create({
    baseURL: "https://movie-database-alternative.p.rapidapi.com/",
    params: {
      r: "json",
      i: `${movie.imdbID}`,
    },
    headers: {
      "X-RapidAPI-Key": "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  });

  const response = await movieDB.get();
  //console.log(response.data);
  return response.data;
};

export const addMovieToStorage = async (movie) => {
  const data = {
    title: movie.Title,
    year: movie.Year,
    description: movie.Plot,
    released: movie.released,
    runtime: movie.Runtime,
    actors: movie.Actors,
    genre: movie.Genre,
    director: movie.Director,
    language: movie.Language,
    score: movie.imdbRating,
    imdbid: movie.imdbID,
    trailer: null,
    backdrop: movie.Poster,
    submittedby: "Admin",
  };
  console.log(data);
  await axios.post(`${DTMN_API_URL}/movies`, data).then((response) => {
    if (response.data === true) {
      alert("Successfully Added to the database");
    } else {
      alert("Movie already exists on the database");
    }
    return response.data;
  });
};

export const getMoviesFromStorage = async () => {
  const movies = axios.create({
    baseURL: `${DTMN_API_URL}/movies`,
  });

  const response = await movies.get();
  return response.data;
};

export const getMovieFromStorage = async (imdbID) => {
  const movie = axios.create({
    baseURL: `${DTMN_API_URL}/movie`,
    params: {
      imdbID: imdbID,
    },
  });

  return await movie.get().then((response) => {
    return response.data;
  });
};
