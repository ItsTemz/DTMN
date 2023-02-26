import axios from "axios";
import { io } from "socket.io-client";

const DTMN_API_URL = window.env.DTMN_API_URL;
const X_RAPIDAPI_KEY = window.env.X_RAPIDAPI_KEY;
const socket = io.connect(DTMN_API_URL);

// client-side
socket.on("connect", () => {
  console.log("Connection to Socket established");
});

export const NotifyDiscord = async (movie) => {
  socket.emit("notify_next_watch", movie);
};

export const setMovieRating = async (content) => {
  const data = {
    _id: content._id,
    rating: content.rating,
    imdbID: content.imdbID,
  };
  await axios.put(`${DTMN_API_URL}/item/rating`, data).then((response) => {
    if (response.data === true) {
      alert("Successfully Updated on Database");
    } else {
      alert("Movie already marked as watched on the database");
    }
    return response.data;
  });
};

export const loginUser = async (passphrase) => {
  const data = { passphrase: passphrase };

  await axios.post(`${DTMN_API_URL}/login`, data).then((response) => {
    console.log(response.data);
    if (response.data) {
      return response.data;
    }
  });
};

export const getAuthentication = async () => {
  return await axios.get(`${DTMN_API_URL}/isAuthenticated`).then((response) => {
    console.log(response.data);
    return response.data;
  })
}

export const markMovieAsWatched = async (movie) => {
  const data = { dbid: movie.dbid };
  await axios.put(`${DTMN_API_URL}/movie`, data).then((response) => {
    if (response.data === true) {
      alert("Successfully Updated on Database");
    } else {
      alert("Movie already marked as watched on the database");
    }
    return response.data;
  });
};

export const getCollections = async () => {
  const collections = axios.create({
    baseURL: `${DTMN_API_URL}/collections`,
  });

  const response = await collections.get();
  return response.data;
};

export const deleteCollection = async (collectionName) => {
  await axios
    .delete(`${DTMN_API_URL}/collection/${collectionName}`)
    .then((response) => {
      if (response.data === true) {
        alert("Successfully Deleted collection");
      } else {
        alert("Collection doesn't exist");
      }
      return response.data;
    });
};

export const getMovies = async (movie) => {
  const movieDB = axios.create({
    baseURL: "https://movie-database-alternative.p.rapidapi.com/",
    params: {
      s: `${movie}`,
      r: "json",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": X_RAPIDAPI_KEY,
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
      "X-RapidAPI-Key": X_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  });

  const response = await movieDB.get();
  return response.data;
};

export const addMovieToStorage = async (movie, submitter) => {
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
    submittedby: submitter || "Admin",
  };

  return await axios.post(`${DTMN_API_URL}/movies`, data).then((response) => {
    if (response.data.movieDetails.title !== data.title) {
      alert("Successfully Added to the database");
    } else {
      alert("Movie already exists");
    }

    return response.data;
  });
};

export const addCustomEntry = async (entry) => {
  const data = {
    title: entry.title,
    link: entry.link,
    submittedby: entry.user || "unknown",
  };
  return await axios.post(`${DTMN_API_URL}/entry`, data).then((response) => {
    if (response.data === true) {
      alert("Added entry to the database");
    } else {
      alert("entry with the same title already exists");
    }
    return response.data;
  });
};

export const getMoviesFromStorage = async (collectionName) => {
  const movies = axios.create({
    baseURL: `${DTMN_API_URL}/movies`,
    params: {
      collectionName: collectionName || "Movie",
    },
  });

  const response = await movies.get();
  return response.data;
};

export const getUsers = async () => {
  const users = axios.create({
    baseURL: `${DTMN_API_URL}/users`,
  });

  const response = await users.get();
  return response.data;
};

export const getUser = async (username) => {
  const user = axios.create({
    baseURL: `${DTMN_API_URL}/user`,
    params: {
      username: username,
    },
  });

  return await user.get().then((response) => {
    return response.data;
  });
};

export const rateUser = async (userData, rating) => {
  return await axios
    .post(`${DTMN_API_URL}/rateuser`, {
      user: userData,
      rating: rating,
    })
    .then((response) => {
      return response.data;
    });
};

export const createCollection = async (collectionName) => {
  return await axios
    .post(`${DTMN_API_URL}/createCollection`, {
      collectionName: collectionName,
    })
    .then((response) => {
      if (response.data === true) {
        alert("Created New Collection");
      } else {
        alert("Collection already exists on the database");
      }
      return response.data;
    });
};

export const getMovieFromStorage = async (id) => {
  const movie = axios.create({
    baseURL: `${DTMN_API_URL}/movie`,
    params: {
      id: id,
    },
  });

  return await movie.get().then((response) => {
    return response.data;
  });
};

export const deleteMovieFromStorage = async (id) => {
  await axios.delete(`${DTMN_API_URL}/movie/${id}`).then((response) => {
    if (response.data === true) {
      alert("Successfully Deleted Movie");
    } else {
      alert("Movie doesn't exist");
    }
    return response.data;
  });
};
