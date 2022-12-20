import { useContext, useEffect, useState } from "react";
import { FaDotCircle, FaPlus } from "react-icons/fa";
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  addMovieToStorage,
  getDetailedMovie,
} from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function MovieItem({ movie }) {
  const { loading } = useContext(MovieDBContext);
  const [movieDetails, SetMovieDetails] = useState({});

  const fetchMovieDetails = async () => {
    const data = await getDetailedMovie(movie);
    SetMovieDetails(data);
  };

  const onAddClicked = () => {
    addMovieToStorage(movieDetails);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const { Title, Year, Poster, imdbID, Ratings, Genre, Runtime, Plot } =
    movieDetails;

  if (!loading) {
    return (
      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <img src={Poster} alt="Shoes" />
        </figure>
        <div className="card-body justify-end">
          <h1 className="card-title">{Title}</h1>
          <div className="card-actions !justify-between ">
            <h3 className="flex justify-center">
              {Year} - {Runtime}
            </h3>
            <button
              className="btn btn-primary btn-outline"
              onClick={onAddClicked}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <PropagateLoader className="text-center mx-auto" color="#6d3a9c" />;
  }
}

export default MovieItem;


