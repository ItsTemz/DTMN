import { Box, Button, Link, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaDiscord, FaEye, FaRotate } from "react-icons/fa";
import Moment from "react-moment";
import { PropagateLoader } from "react-spinners";
import { NotifyDiscord } from "../../context/moviedb/MovieDBActions";
import PressOnceButton from "../layout/PressOnceButton";
import TrailerModal from "../layout/TrailerModal";
import UserChip from "../Users/UserChip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MovieDetailsModal({ movie, handleModalClose, markAsWatched }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    handleModalClose();
  };
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

  const { submittedby, dateAdded, link } = movie.otherDetails;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="h-[90%] bg-slate-900 image-cover card flex flex-col bg-cover bg-no-repeat bg-center shadow-3xl bg-blur text-base-100"
        style={{
          ...style,
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.0), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1)) ,url(${backdrop})`,
        }}
      >
        <div className="h-[65%] flex w-full">
          <div className="p-16 h-[200px] flex justify-end flex-col">
            <button
              className="btn btn-circle btn-outline absolute right-5 top-5"
              onClick={handleClose}
            >
              <FaArrowLeft icon="fa-solid fa-arrow-left" />
            </button>
            <div className="h-[25%] absolute bottom-64 flex flex-col">
              <div className="my-5">
                <h1 className="lg:text-5xl md:text-4xl sm:text-3xl">{title}</h1>
              </div>

              {trailer && (
                <div className="flex flex-row ">
                  <TrailerModal buttonText={"Play Trailer"} url={trailer} />
                </div>
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
            </div>
          </div>
        </div>

        <div className="gird grid-rows-1 p-16 pt-5 h-1/3 text-xl">
          <div className="flex justify-between align-middle text-center mb-3">
            <div className="breadcrumbs font-bold text-center">
              <ul>
                <li>
                  <span className="lg:text-3xl md:2xl sm:xl"> {year} </span>
                </li>
                <li>
                  <span className="lg:text-xl md:lg sm:sm text-success">
                    {" "}
                    {runtime}{" "}
                  </span>
                </li>
                <li>
                  <span className="lg:text-md md:sm sm:xs text-warning">
                    {" "}
                    {language}{" "}
                  </span>
                </li>
              </ul>
            </div>

            <div className="">
              <ul className="menu menu-horizontal">
                <li className="px-1">
                  <button
                    className="btn btn-accent btn-outline text-xl rounded-xl"
                    onClick={() => {
                      NotifyDiscord(movie);
                      window.location.reload();
                    }}
                  >
                    <FaDiscord />
                  </button>
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
    </Modal>
  );
}

export default MovieDetailsModal;
