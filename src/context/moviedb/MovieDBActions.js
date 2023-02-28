import axios from "axios";
import { io } from "socket.io-client";
import { Store } from "react-notifications-component";

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
      Store.addNotification({
        title: "Okay",
        message: "Movie rated successfully",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "hmm 🤔",
        message: "Looks like this was already seen.",
        type: "error",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
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
      Store.addNotification({
        title: "Okay",
        message: "Movie marked as watched.",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "hmm 🤔",
        message: "Looks like we've already seen this.",
        type: "warning",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
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
        Store.addNotification({
          title: "Poof!",
          message: "And it's gone",
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      } else {
        Store.addNotification({
          title: "hmm 🤔",
          message: "That collection doesn't exist.",
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
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

  Store.addNotification({
    title: "Adding movie",
    message: "Attempting to add movie...",
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });

  return await axios.post(`${DTMN_API_URL}/movies`, data).then((response) => {
    if (response.data === true) {
      Store.addNotification({
        title: "Wonderful!",
        message: "Movie Added",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "Uh oh!",
        message: "Movie seems to already exist.",
        type: "warning",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
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
  Store.addNotification({
    title: "Adding movie",
    message: "Attempting to add movie...",
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });

  return await axios.post(`${DTMN_API_URL}/entry`, data).then((response) => {
    if (response.data === true) {
      Store.addNotification({
        title: "Success",
        message: "Your entry was successfully added.",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      setTimeout(function() {window.location.reload();}, 1500)
    } else {
      Store.addNotification({
        title: "Uh oh!",
        message: "Entry with the same name already exists.",
        type: "warning",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
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
        Store.addNotification({
          title: "Hooray!",
          message: "Successfully created a new collection.",
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      } else {
        Store.addNotification({
          title: "Uh oh!",
          message: "Collection with the same name already exists.",
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
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
      Store.addNotification({
        title: "Poof!",
        message: "And it's gone",
        type: "success",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "hmm 🤔",
        message: "I have never seen that entry before.",
        type: "error",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
    return response.data;
  });
};
