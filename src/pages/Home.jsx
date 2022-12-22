import { useContext, useEffect, useState } from "react";
import MovieLibrary from "../components/MovieLibrary/MovieLibrary";
import PickerWheelMenu from "../components/PickerWheelMenu";
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
    <div>
      <PickerWheelMenu />
      <MovieLibrary />
    </div>
  );
}

export default Home;
