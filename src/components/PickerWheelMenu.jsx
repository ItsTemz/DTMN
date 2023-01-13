import React, { useContext, useEffect, useState } from "react";
import Turntable from "../components/Turntable/Turntable";
import {
  getMoviesFromStorage,
  markMovieAsWatched,
} from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";
import MovieList from "./MovieList/MovieList";
import MovieDetailsModal from "./movies/MovieDetailsModal";

function PickerWheelMenu() {
  const { movieStorage, displayItems, activeCollection, dispatch } = useContext(MovieDBContext);
  const [winnerMovie, setWinnerMovie] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [storageItems, setStorageItems] = useState([]);

  const onWinnerSelected = (movie) => {
    setWinnerMovie(movie);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const markAsWatched = () => {
    markMovieAsWatched(winnerMovie);
  };

  const deleteItem = (_id) => {
    setStorageItems(storageItems.filter((item) => item._id !== _id));
  };

  const addItem = (item) => {
    setStorageItems([...storageItems, item]);
    dispatch({ type: "UPDATE_STORAGE_UI", payload: storageItems });
    window.location.reload();
  };

  useEffect(() => {
    setStorageItems(
      movieStorage.filter((item) => item.otherDetails.watched !== true)
    );
    dispatch({ type: "INIT_STORAGE_UI", payload: storageItems });
  }, [dispatch, movieStorage, storageItems, displayItems, activeCollection]);

  useEffect(() => {
    getMoviesFromStorage(activeCollection).then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });
  }, [activeCollection]);

  return (
    <div className="h-[70%]">
      <div className="h-[60vh] flex flex-row-reverse  p-5 bg-opacity-50 bg-gray-900 rounded-2xl ">
        {showModal && (
          <MovieDetailsModal
            movie={winnerMovie}
            handleModalClose={handleModalClose}
            markAsWatched={markAsWatched}
          />
        )}
        {storageItems && (
          <div className="flex-1">
            <MovieList
              movieStorage={storageItems}
              deleteItem={deleteItem}
              addItem={addItem}
            />
          </div>
        )}
        {displayItems && (
          <div className="flex-1">
            <Turntable
              movieSelected={onWinnerSelected}
              movieStorage={displayItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PickerWheelMenu;
