import React from "react";
import MovieLibraryItem from "./MovieLibraryItem";

function MovieLibraryList(props) {
  return (
    <div className="m-2 ">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 ">
        {props.movieStorage.map((movie) => (
          <MovieLibraryItem key={movie.dbid} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieLibraryList;
