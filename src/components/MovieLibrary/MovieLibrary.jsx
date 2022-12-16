import React, { useContext, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { getMoviesFromStorage } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import BasicPagination from "../Pagination";
import MovieLibraryList from "./MovieLibraryList";
import MovieLibraryNavbar from "./MovieLibraryNavbar";

function MovieLibrary() {
  const { loading, movieStorage, dispatch } = useContext(MovieDBContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [searchMovies, setSearchMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieStorage.slice(indexOfFirstMovie, indexOfLastMovie);

  useEffect(() => {
    getMoviesFromStorage().then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });
  }, []);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Search for movies in local storage
  const searchMovie = (searchString) => {
    if (searchString === "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const searched = movieStorage.filter((movie) => {
        if (movie.movieDetails) {
          const foundMovies = movie.movieDetails.title
            .toLowerCase()
            .includes(searchString.toLowerCase());
          return foundMovies;
        }
      });
      setSearchMovies(searched);
    }
  };

  const applyUserFilter = (user) => {
    if (!user) {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const searched = movieStorage.filter((movie) => {
        if (movie.otherDetails) {
          const foundMovies = movie.otherDetails.submittedby;
          return foundMovies.includes(user);
        }
      });
      console.log(searched);
      setSearchMovies(searched);
    }
  };

  if (!loading) {
    if (movieStorage.length > 0) {
      return (
        <div className="grid grid-cols-1 justify-center">
          <MovieLibraryNavbar
            numberOfMovies={movieStorage.length}
            searchMovie={searchMovie}
            movieStorage={movieStorage}
            applyFilter={applyUserFilter}
          />
          <div className="container flex flex-col w-full bg-base-300 rounded-lg ">
            {currentMovies.length > 0 ? (
              <MovieLibraryList
                movieStorage={isSearching ? searchMovies : currentMovies}
              />
            ) : (
              <div className="w-full justify-center h-full">
                Nothing to show
              </div>
            )}
          </div>
          <BasicPagination
            itemsPerPage={moviesPerPage}
            totalItems={movieStorage.length}
            paginate={paginate}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <PropagateLoader className="text-center mx-auto" color="#6d3a9c" />;
  }
}

export default MovieLibrary;
