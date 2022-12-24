import React from "react";
import { FaTrash } from "react-icons/fa";
function MovieListItem({ movie }) {
  const { title } = movie.movieDetails;
  const { submittedby } = movie.otherDetails;
  return (
    <div className="w-full flex">
      <input
        type="text"
        value={title}
        className="input input-bordered w-full"
        readonly
      />
      <div className="h-12 w-12">
        <input
          type="checkbox"
          className="z-50 checkbox checkbox-lg h-12 w-full p-1"
        />
      </div>

      <button className="btn btn-square">
        <svg
          class="w-6 h-6"
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
