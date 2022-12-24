import React, { useRef, useState } from "react";
import Turntable from "../components/Turntable/Turntable";
import { markMovieAsWatched } from "../context/moviedb/MovieDBActions";
import MovieList from "./MovieList/MovieList";
import MovieDetailsModal from "./movies/MovieDetailsModal";
import TurntableMenu from "./Turntable/TurntableMenu";

function PickerWheelMenu() {
  const [winnerMovie, setWinnerMovie] = useState({});
  const [showModal, setShowModal] = useState(false);

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
  return (
    <div className="grid grid-cols-2 p-2">
      {showModal && (
        <MovieDetailsModal
          movie={winnerMovie}
          handleModalClose={handleModalClose}
          markAsWatched={markAsWatched}
        />
      )}
      <Turntable movieSelected={onWinnerSelected} />
      <MovieList />
      {/* <TurntableMenu /> */}
    </div>
  );
}

export default PickerWheelMenu;
