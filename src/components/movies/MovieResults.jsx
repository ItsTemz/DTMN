import { useContext } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import MovieItem from "../../components/movies/MovieItem";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function MovieResults() {
  const { loading, movies } = useContext(MovieDBContext);

  if (!loading) {
    if (movies.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <PropagateLoader className="text-center mx-auto" color="#6d3a9c" />;
  }
}

export default MovieResults;
