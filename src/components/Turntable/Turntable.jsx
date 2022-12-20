import React, { useContext, useEffect, useRef, useState } from "react";
import { PropagateLoader } from "react-spinners";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import ReactTurntable from "./TurntableComponent";
import "./TurntableStyles.css";


function Turntable() {
  const { loading, movieStorage } = useContext(MovieDBContext);
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

  if (!loading && prizes.length >= 2) {
    const options = {
      prizes,
      width: 800,
      height: 800,
      wheelColors: ["#0FA3B1", "#B5E2FA", "#F9F7F3", "#EDDEA4"],
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
        console.log("prize:", prize);
      },
    };

    return (
      <div className="h-full flex justify-center">
        <ReactTurntable {...options} />;
      </div>
    );
  } else {
    return (
      <PropagateLoader
        className="text-center mx-auto my-auto"
        color="#6d3a9c"
      />
    );
  }
}

export default Turntable;