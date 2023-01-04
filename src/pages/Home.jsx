import { useContext, useEffect, useState } from "react";
// import MovieLibrary from "../components/MovieLibrary/MovieLibrary";
import PickerWheelMenu from "../components/PickerWheelMenu";
import { getMoviesFromStorage } from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";

function Home() {
  const { movieStorage ,dispatch} = useContext(MovieDBContext);
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    getMoviesFromStorage().then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });
  }, [dispatch]);
  
  useEffect(() => {
    movieStorage.map((movie) => {
      setChoices(...choices, movie.movieDetails.title);
      return 0;
    });
  }, [movieStorage, choices]);

  return (
    <div>
      <div>
        <PickerWheelMenu />
      </div>
      {/* <MovieLibrary/> */}
    </div>
  );
}

export default Home;
