import React, { useContext, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import duckImage from "./Assets/DuckNoData.png";
import ReactTurntable from "./TurntableComponent";
import "./TurntableStyles.css";

const styles = {
  justifyContent: "center",
  alignContent: "center",
  display: "flex",
};

function Turntable({ movieSelected, movieStorage }) {
  const { loading, activeCollection } = useContext(MovieDBContext);
  const [prizes, setPrizes] = useState([]);
  let choices = [];

  useEffect(() => {
    for (let i = 0; i < movieStorage.length; i++) {
      if (
        !choices.includes(movieStorage[i].movieDetails.title) &&
        !movieStorage[i].otherDetails.watched
      ) {
        choices.push(
          movieStorage[i].movieDetails.title.substring(0, 30).trim()
        );
      }
    }
    setPrizes(choices);
  }, [movieStorage, activeCollection]);

  const getWinner = (prize) => {
    return movieStorage.find(
      (movie) => movie.movieDetails.title.substring(0, 30).trim() === prize
    );
  };
  const options = {
    prizes,
    width: 620,
    height: 620,
    wheelColors: ["#0FA3B1", "#B5E2FA", "#F9F7F3", "#EDDEA4", "#1a202c"],
    primaryColor: "gray",
    secondaryColor: "#1a202c",
    fontStyle: {
      color: "#fff",
      size: 14,
      fontWeight: "400",
      fontVertical: true,
      fontFamily: `-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
      helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif`,
    },
    speed: 50,
    duration: 5000,
    clickText: "SPIN!",
    manualStop: false,
    weightOn: false,
    soundOn: true,
    onStart() {
      //If you want before the rotate do some...
      console.log("start...");
      //If you want stop rotate you can return false
      return true;
    },
    onComplete(prize) {
      const winner = getWinner(prize);
      console.log("winner: ", winner);
      movieSelected(winner);
    },
  };

  if (!loading && prizes.length >= 2) {
    return (
      <div className="h-full flex">
        <div className="justify-center mx-auto my-auto" style={styles}>
          <ReactTurntable {...options} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex">
        <div className="mx-auto my-auto h-[50%] w-[50%]">
          <img
            className="  border rounded-full p-10 border-black bg-black bg-opacity-50 "
            src={duckImage}
            alt="Alternate text"
          ></img>
          <h1 className="text-3xl text-center text-warning p-5">
            Please add at least two entries.
          </h1>
        </div>
      </div>
    );
  }
}

export default Turntable;
