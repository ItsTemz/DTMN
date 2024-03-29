import React, { useContext, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { getMoviesFromStorage } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import BasicPagination from "../Pagination";
import MovieLibraryList from "./MovieLibraryList";
import LibraryNavbar from "./MovieLibraryNavbar";
import ItemDatabaseNavbar from "../../components/layout/PickerWheelMenuNavbar";



function Library() {
  const { loading, movieStorage,activeCollection, dispatch } = useContext(MovieDBContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchItems, setSearchItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get current movies
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movieStorage.slice(indexOfFirstMovie, indexOfLastMovie);

  useEffect(() => {
    getMoviesFromStorage(activeCollection).then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });
  }, [activeCollection, dispatch]);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Search for movies in local storage
  const searchItem = (searchString) => {
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
      setSearchItems(searched);
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
      setSearchItems(searched);
    }
  };

  if (!loading) {
    return (
      <div className="grid grid-cols-1 justify-center">
        <ItemDatabaseNavbar />
        <LibraryNavbar
          numberOfMovies={movieStorage.length}
          searchMovie={searchItem}
          movieStorage={movieStorage}
          applyFilter={applyUserFilter}
        />
        <div className="container flex flex-col w-full bg-neutral bg-opacity-90 rounded-lg ">
          {currentMovies.length > 0 ? (
            <MovieLibraryList
              movieStorage={isSearching ? searchItems : currentMovies}
            />
          ) : (
            <div className="w-full justify-center h-full">Nothing to show</div>
          )}
        </div>
        <BasicPagination
          itemsPerPage={itemsPerPage}
          totalItems={movieStorage.length}
          paginate={paginate}
        />
      </div>
    );
  } else {
    return <PropagateLoader className="text-center mx-auto" color="#6d3a9c" />;
  }
}

export default Library;
