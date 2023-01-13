import React from "react";
import { Link } from "react-router-dom";
import { deleteMovieFromStorage } from "../../context/moviedb/MovieDBActions";
import UserChip from "../Users/UserChip";
function MovieListItem({ movie, deleteItem, hideItem }) {
  const { title } = movie.movieDetails;
  const { submittedby } = movie.otherDetails;
  return (
    <div className="w-full flex bg-base-100 p-1">
      <Link
        type="text"
        className="input input-bordered w-full btn text-left justify-start "
        readonly
        to={`/movie/${movie._id}`}
      >
        {title || "Unknown"}
      </Link>
      <div className="h-full m-auto px-1">
        <UserChip username={submittedby} />
      </div>
      {/* <div className="h-12 w-12">
        <input
          type="checkbox"
          className="z-50 checkbox checkbox-lg h-12 w-full p-1"
          defaultChecked
          onChange={(e) => hideItem(movie, e.target.checked)}
        />
      </div> */}

      <button
        className="btn btn-square"
        onClick={() => {
          deleteMovieFromStorage(movie._id);
          deleteItem(movie._id);
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
