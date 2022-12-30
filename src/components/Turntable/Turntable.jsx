import React, { useContext, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import ReactTurntable from "./TurntableComponent";
import "./TurntableStyles.css";

function Turntable({ movieSelected, movieStorage }) {
  const { loading } = useContext(MovieDBContext);
  const [prizes, setPrizes] = useState([]);
  let choices = [];

  useEffect(() => {
    for (let i = 0; i < movieStorage.length; i++) {
      if (!choices.includes(movieStorage[i].movieDetails.title)) {
        choices.push(
          movieStorage[i].movieDetails.title.substring(0, 30).trim()
        );
      }
    }
    setPrizes(choices);
  }, [movieStorage]);

  const getWinner = (prize) => {
    return movieStorage.find((movie) => movie.movieDetails.title === prize);
  };

  if (!loading && prizes.length >= 2) {
    const options = {
      prizes,
      width: 700,
      height: 700,
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
        movieSelected(winner);
      },
    };

    return (
      <div className="h-full flex">
        <div className="justify-center mx-auto my-auto">
          <ReactTurntable {...options} />
        </div>
      </div>
    );
  } else {
    return (
      <PropagateLoader
        className="h-full text-center align-middle"
        color="#fff"
      />
    );
  }
}

export default Turntable;
