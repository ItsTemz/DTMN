import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import TrailerModal from "../components/layout/TrailerModal";
import { getMovieFromStorage } from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";
import { FaArrowLeft } from "react-icons/fa";

function Movie() {
  const { movie, loading, dispatch } = useContext(MovieDBContext);

  // const [movie , setMovie] = useState({});

  const params = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getMovieData = async () => {
      const movieData = await getMovieFromStorage(params.imdbID);
      console.log(movieData);
      dispatch({ type: "GET_MOVIE_FROM_STORAGE", payload: movieData });
    };

    getMovieData();
  }, [dispatch, params.imdbID]);

  if (loading || !movie) {
    return <PropagateLoader />;
  }

  if (movie && movie.movieDetails) {
    const {
      actors,
      backdrop,
      description,
      director,
      genre,
      imdbID,
      language,
      runtime,
      score,
      title,
      trailer,
      year,
    } = movie.movieDetails;

    const { submittedby, dateAdded } = movie.otherDetails;

    return (
      movie && (
        <div
          className="h-[90%] bg-slate-900 image-cover card flex flex-col bg-cover bg-no-repeat bg-center shadow-3xl bg-blur "
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.0), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1)) ,url(${backdrop})`,
          }}
        >
          <div className="h-[65%] flex w-full">
            <div className="p-16 h-[200px] flex justify-end flex-col">
              <Link className="btn btn-circle btn-outline absolute right-5 top-5" to='/'>
                <FaArrowLeft icon="fa-solid fa-arrow-left" />
              </Link>
              <div className="h-[25%] absolute bottom-64 flex flex-col">
                <div className="my-5">
                  <h1 className="text-5xl">{title}</h1>
                </div>
                <div className="flex flex-row">
                  <TrailerModal buttonText={"Play Trailer"} url={trailer} />

                  <button className="btn btn-circle btn-outline btn-xl mx-5 text-3xl">
                    +
                  </button>
                  <div className="rating rating-lg rating-half">
                    <input
                      type="radio"
                      name="rating-10"
                      className="rating-hidden"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-1"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-2"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-1"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-2"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-1"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-2"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-1"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-2"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-1"
                    />
                    <input
                      type="radio"
                      name="rating-10"
                      className="bg-orange-400 mask mask-star-2 mask-half-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 p-16 h-1/3 text-xl">
            <div className="col mr-10">
              <div>
                <p className="text-2xl">
                  <span className=""> {year} </span>
                  <span className="text-xl"> {runtime} </span>
                  <span className="text-lg"> {language} </span>
                </p>
              </div>

              <div className="py-5">
                <p className="">{description}</p>
              </div>
            </div>
            <div className="grid grid-row-1 mr-10">
              <span>
                Cast
                <p>{actors}</p>
              </span>
              <span>
                Genres <p>{genre}</p>
              </span>
              <span>
                This movie was added by <span>{submittedby}</span> on
                <span> {dateAdded}</span>
              </span>
            </div>
          </div>
        </div>
      )
    );
  } else {
    return <PropagateLoader />;
  }
}

export default Movie;
