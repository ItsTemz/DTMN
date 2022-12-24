import React from "react";
import { useContext } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import MovieListItem from "./MovieListItem";

function MovieList() {
  const { movieStorage } = useContext(MovieDBContext);

  return (
    <div className="w-full">
      {movieStorage.map((movie) => (
        <MovieListItem movie={movie}/>
      ))}
    </div>
  );
}

export default MovieList;
