import React, { useContext, useState } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import SearchedMovieListItem from "../layout/SearchedMovieListItem";
import MovieListItem from "./MovieListItem";
import MovieListNavbar from "./MovieListNavbar";

function MovieList({ movieStorage, deleteItem, addItem }) {
  const { movies, isSearching } = useContext(MovieDBContext);
  return (
    <div className="h-[100%] w-full">
      <MovieListNavbar numOfItems={movieStorage.length} />
      <div className="w-full h-[90%] overflow-y-scroll overflow-x-clip list">
        <div className="bg-gray-900 border-gray-900 rounded-lg my-1 p-1">
          {!isSearching ? (
            <div className="flex flex-col-reverse">
              {movieStorage.map((movie) => (
                <MovieListItem
                  movie={movie}
                  key={movie._id}
                  deleteItem={deleteItem}
                />
              ))}
            </div>
          ) : (
            <div>
              {movies.map((movie) => {
                if (movie.Title)
                  return (
                    <SearchedMovieListItem
                      key={movie._id}
                      movie={movie}
                      addItem={addItem}
                    />
                  );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
