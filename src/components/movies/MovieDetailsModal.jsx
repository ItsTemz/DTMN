import { Box, Button, Link, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaDiscord, FaEye,FaRotate } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { NotifyDiscord } from "../../context/moviedb/MovieDBActions";
import PressOnceButton from "../layout/PressOnceButton";
import TrailerModal from "../layout/TrailerModal";

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

  const { submittedby, dateAdded ,link} = movie.otherDetails;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="h-[90%] bg-slate-900 image-cover card flex flex-col bg-cover bg-no-repeat bg-center shadow-3xl bg-blur "
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
                <h1 className="text-5xl">{title}</h1>
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
          <div className="flex justify-between align-middle text-center">
            <div className="breadcrumbs ">
              <ul>
                <li>
                  <span className="text-2xl"> {year} </span>
                </li>
                <li>
                  <span className="text-lg"> {runtime} </span>
                </li>
                <li>
                  <span className=""> {language} </span>
                </li>
              </ul>
            </div>

            <div className="">
              <ul className="menu menu-horizontal">
                <li className="text-3xl">
                  <PressOnceButton
                    onClick={() => {
                      NotifyDiscord(movie);
                    }}
                    icon={<FaDiscord />}
                  />
                </li>
                <li>
                  <PressOnceButton
                    onClick={() => {
                      markAsWatched();
                    }}
                    icon={<FaEye />}
                  />
                </li>
                <li>
                  <PressOnceButton
                    onClick={() => {
                      window.location.reload();
                    }}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                          fill="#fff"
                        />
                      </svg>
                    }
                  />
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
                <span>
                  Cast
                  <p>{actors}</p>
                </span>
              )}
              {genre && (
                <span>
                  Genres <p>{genre}</p>
                </span>
              )}

              <span></span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetailsModal;
