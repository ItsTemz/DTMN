import React from "react";
import { Link } from "react-router-dom";
import { deleteMovieFromStorage } from "../../context/moviedb/MovieDBActions";
import UserChip from "../Users/UserChip";
function MovieListItem({ movie, deleteItem, hideItem }) {
  const { title } = movie.movieDetails;
  const { submittedby } = movie.otherDetails;
  return (
    <div className="w-full flex bg-neutral rounded-xl m-[0.15rem]">
      <Link
        type="text"
        className="input bg-neutral input-bordered w-full btn text-left justify-start "
        readonly
        to={`/movie/${movie._id}`}
      >
        {title || "Unknown"}
      </Link>
      <div className="h-full m-auto px-1">
        <UserChip givenUsername={submittedby} />
      </div>
      <button
        className="btn btn-square"
        onClick={() => {
          deleteMovieFromStorage(movie._id);
          deleteItem(movie._id);
          window.location.reload();
        }}
      >
        <svg
          className="w-6 h-6"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 100L0 0" stroke="red" stroke-width="20" />
          <path d="M0 100L100 0" stroke="red" stroke-width="20" />
        </svg>
      </button>
    </div>
  );
}

export default MovieListItem;
