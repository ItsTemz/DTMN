import React, { useContext } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import SearchedMovieListItem from "../layout/SearchedMovieListItem";
import MovieListItem from "./MovieListItem";
import ListNavbar from "./MovieListNavbar";

function MovieList({ movieStorage, deleteItem, addItem, hideItem }) {
  const { movies, isSearching } = useContext(MovieDBContext);
  return (
    <div className="h-[100%] w-full">
      <ListNavbar numOfItems={movieStorage.length} />
      <div className="w-full h-[90%] overflow-y-scroll overflow-x-clip list bg-neutral bg-opacity-75 rounded-lg my-1 p-1">
        <div className="">
          {!isSearching ? (
            <div className="flex flex-col-reverse">
              {movieStorage.map((movie) => (
                <MovieListItem
                  movie={movie}
                  key={movie._id}
                  deleteItem={deleteItem}
                  hideItem={hideItem}
                />
              ))}
            </div>
          ) : movies ? (
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
                return 0;
              })}
            </div>
          ) : (
            <h1>No Results</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
