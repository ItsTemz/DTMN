import React, { useContext, useEffect, useState } from "react";
import {
  addMovieToStorage,
  getDetailedMovie,
  getMoviesFromStorage,
} from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function SearchedMovieListItem({ movie, addItem }) {
  const [movieDetails, SetMovieDetails] = useState({});
  const { dispatch } = useContext(MovieDBContext);

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

  const { Title, Year, Poster } = movie;
  return (
    <div className="flex flex-row bg-black">
      <div>
        <img src={Poster} alt="poster" className="w-[6rem] h-[7rem]" />
      </div>
      <div className="p-5 flex w-full ">
        <div className="flex-1">
          <h1 className="font-bold text-xl">{Title}</h1>
          <p className="">{Year}</p>
        </div>
        <div className="">
          <button
            className="btn btn-outline btn-primary"
            onClick={onAddClicked}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchedMovieListItem;
