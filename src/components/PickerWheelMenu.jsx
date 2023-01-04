import React, { useContext, useEffect, useState } from "react";
import Turntable from "../components/Turntable/Turntable";
import { markMovieAsWatched } from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";
import MovieList from "./MovieList/MovieList";
import MovieDetailsModal from "./movies/MovieDetailsModal";

function PickerWheelMenu() {
  const { movieStorage } = useContext(MovieDBContext);
  const [winnerMovie, setWinnerMovie] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [storageItems, setStorageItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

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
    alert("Item deleted");
  };

  const addItem = (item) => {
    setStorageItems(...storageItems, item);
    setDisplayItems(storageItems);
  };

  const hideItems = (item, changeVal) => {
    console.log(item);
    if (!changeVal) {
      setDisplayItems(displayItems.filter((i) => i._id !== item._id));
      console.log(displayItems);
    } else {
      setDisplayItems(displayItems.concat(item));
    }
  };

  useEffect(() => {
    setStorageItems(movieStorage);
    setDisplayItems(storageItems);
  }, [movieStorage, storageItems]);

  useEffect(() => {
    setDisplayItems(displayItems);
  }, [storageItems, displayItems]);

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
              hideItem={hideItems}
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
