import React from "react";
import { deleteMovieFromStorage } from "../../context/moviedb/MovieDBActions";
function MovieListItem({ movie, deleteItem }) {
  const { title } = movie.movieDetails;
  const { submittedby } = movie.otherDetails;
  return (
    <div
      className="w-full flex tooltip tooltip-open tooltip-left tooltip-info bg-base-100"
      data-tip={`${submittedby}`}
    >
      <button
        type="text"
        className="input input-bordered w-[70%] btn btn-outline text-left justify-start "
        readonly
      >
        {" "}
        {title || "Unknown"}
      </button>
      <div className="h-full align-middle w-[20%] justify-center text-center text-xl pt-2">
        {submittedby}
      </div>
      <div className="h-12 w-12">
        <input
          type="checkbox"
          className="z-50 checkbox checkbox-lg h-12 w-full p-1"
          defaultChecked
        />
      </div>

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
