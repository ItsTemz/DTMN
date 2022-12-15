import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function MovieLibraryItem({ movie }) {
  const { loading} = useContext(MovieDBContext);
  const [movieDetails, SetMovieDetails] = useState({});
  const [contributorDetails, SetContributorDetails] = useState({});

  useEffect(() => {
    SetMovieDetails(movie.movieDetails);
    SetContributorDetails(movie.otherDetails);
  }, []);


  if (!loading) {
    if (movieDetails && contributorDetails){
      const { poster, description, imdbID, title , backdrop} = movieDetails;

      const { submittedby } = contributorDetails;
      return (
        <div className="card bg-base-100 shadow-xl image-full w-full">
          <span className="absolute badge badge- badge-outline z-10 right-4 top-5 text-lg h-10 font-bold">
            {submittedby}
          </span>
          <figure className="">
            <img src={poster || backdrop} alt="backdrop" />
          </figure>
          <div className="card-body flex justify-end">
            <h2 className="card-title">{title}</h2>
            <div className="object-contain">
              <p className="truncate-overflow sm:text-sm">{description}</p>
              <a
                className="btn btn-xs btn-outline my-2"
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank"
                rel="noreferrer"
              >
                More info
              </a>
            </div>
            <div className="card-actions justify-end">
              <Link
                className="btn btn-outline btn-primary btn-md text-base-content bg-blur-5"
                to={`/movie/${imdbID}`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      );
    }else{
      return <div></div>
    }
  } else {
    return <PropagateLoader className="text-center mx-auto" color="#6d3a9c" />;
  }
}

export default MovieLibraryItem;
