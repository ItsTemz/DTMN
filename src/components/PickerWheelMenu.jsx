import React, { useRef, useState } from "react";
import Turntable from "../components/Turntable/Turntable";
import MovieDetailsModal from "./movies/MovieDetailsModal";
import TurntableMenu from "./Turntable/TurntableMenu";

function PickerWheelMenu() {
  const [winnerMovie, setWinnerMovie] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onWinnerSelected = (movie) => {
    setWinnerMovie(movie);
    setShowModal(true);
    console.log(winnerMovie);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="grid grid-cols-2 p-2">
      {showModal && (
        <MovieDetailsModal
          movie={winnerMovie}
          handleModalClose={handleModalClose}
        />
      )}
      <Turntable movieSelected={onWinnerSelected} />
      {/* <TurntableMenu /> */}
    </div>
  );
}

export default PickerWheelMenu;
