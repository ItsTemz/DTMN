import { useContext, useEffect, useState } from "react";
import MovieLibrary from "../components/MovieLibrary/MovieLibrary";
import Turntable from "../components/Turntable/Turntable";
import MovieDBContext from "../context/moviedb/MovieDBContext";

function Home() {
  const { movieStorage } = useContext(MovieDBContext);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    movieStorage.map((movie) => {
      setChoices(...choices, movie.movieDetails.title);
      console.log(choices);
    });
  }, []);

  return (
    <div className="">
      <Turntable />
      <MovieLibrary />
    </div>
  );
}

export default Home;
