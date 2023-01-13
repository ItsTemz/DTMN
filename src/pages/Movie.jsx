// import StarIcon from "@mui/icons-material/Star";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaTrash } from "react-icons/fa";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import TrailerModal from "../components/layout/TrailerModal";
import {
  deleteMovieFromStorage,
  getMovieFromStorage,
  markMovieAsWatched,
  setMovieRating,
} from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import UserChip from "../components/Users/UserChip";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const labels = {
  0.5: "Absolutely Shit",
  1: "L",
  1.5: "Gross",
  2: "Ass",
  2.5: "Subpar",
  3: "Mid",
  3.5: "Aight",
  4: "Hits Different",
  4.5: "Bop",
  5: "Sheesh ",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function Movie() {
  const { movie, loading, dispatch } = useContext(MovieDBContext);
  const [hover, setHover] = useState(-1);
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (newRating) => {
    setMovieRating({
      _id: movie._id,
      rating: newRating,
      imdbID: movie.dbid,
    });
    setRatingValue(newRating);
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getMovieData = async () => {
      const movieData = await getMovieFromStorage(id);
      dispatch({ type: "GET_MOVIE_FROM_STORAGE", payload: movieData });
      if (movieData.otherDetails.duckTalkRating) {
        setRatingValue(movieData.otherDetails.duckTalkRating);
      }
    };
    getMovieData();
  }, [dispatch, id]);

  if (loading || !movie) {
    return <PropagateLoader />;
  }

  if (movie && movie.movieDetails) {
    const {
      actors,
      backdrop,
      description,
      genre,
      imdbID,
      language,
      runtime,
      score,
      title,
      trailer,
      year,
    } = movie.movieDetails;

    const {
      submittedby,
      dateAdded,
      link,
      watched,
      dateWatched,
      duckTalkRating,
    } = movie.otherDetails;

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
              {watched && (
                <div className="absolute left-5 top-5 border rounded-lg outline-4">
                  <div className="p-2 text-xl font-bold ">
                    <span className="">Watched</span>{" "}
                    <Moment format="MMMM Do YYYY">{dateWatched}</Moment>
                  </div>
                </div>
              )}

              <Link
                className="btn btn-circle btn-outline absolute right-5 top-5"
                to="/"
              >
                <FaArrowLeft icon="fa-solid fa-arrow-left" />
              </Link>

              <div className="h-[25%] absolute bottom-64 flex flex-col">
                <div className="my-5">
                  <h1 className="text-4xl">{title}</h1>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    {trailer && (
                      <TrailerModal buttonText={"Play Trailer"} url={trailer} />
                    )}
                    {link && (
                      <div className="flex flex-row ">
                        <a
                          className="btn btn-outline btn-primary"
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link
                        </a>
                      </div>
                    )}

                    <div className="px-5 my-auto flex items-center justify-center text-2xl">
                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <StyledRating
                          name="hover-feedback"
                          value={ratingValue}
                          size="large"
                          precision={0.5}
                          onChange={(e, newValue) =>
                            handleRatingChange(newValue)
                          }
                          getLabelText={getLabelText}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55, color: "grey" }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {ratingValue !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : ratingValue]}
                          </Box>
                        )}
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gird grid-rows-1 p-16 pt-5 h-1/3 text-xl">
            <div className="flex justify-between align-middle text-center mb-3">
              <div className="breadcrumbs font-bold text-center">
                <ul>
                  <li>
                    <span className="text-3xl"> {year} </span>
                  </li>
                  <li>
                    <span className="text-xl"> {runtime} </span>
                  </li>
                  <li>
                    <span className="text-md"> {language} </span>
                  </li>
                </ul>
              </div>

              <div className="">
                <ul className="menu menu-horizontal">
                  <li className="px-1">
                    <button
                      className="btn btn-warning btn-outline text-xl rounded-xl"
                      onClick={() => {
                        markMovieAsWatched(movie);
                        window.location.reload();
                      }}
                    >
                      <FaEye />
                    </button>
                  </li>
                  <li className="px-1">
                    <Link
                      className="btn btn-error btn-outline text-xl rounded-xl"
                      to="/"
                      onClick={() => {
                        deleteMovieFromStorage(movie._id);
                        window.location.reload();
                      }}
                    >
                      <FaTrash />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="mr-10">
                <div className="">
                  <p className="">{description}</p>
                </div>
              </div>
              <div className="grid grid-row-1 mr-10">
                {actors && (
                  <span className="py-1">
                    <h1 className="card-title">Cast:</h1>
                    <p>{actors}</p>
                  </span>
                )}
                {genre && (
                  <span className="py-1">
                    <h1 className="card-title">Genres:</h1> <p>{genre}</p>
                  </span>
                )}

                <span className="py-1">
                  <h1 className="card-title">Added by:</h1>
                  <div className="flex">
                    <span className="font-bold text-primary">
                      <UserChip username={submittedby} />{" "}
                    </span>{" "}
                    on{" "}
                    <Moment
                      format="MMMM Do YYYY"
                      className="font-bold text-accent"
                    >
                      {dateAdded}
                    </Moment>
                  </div>
                </span>
              </div>
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
