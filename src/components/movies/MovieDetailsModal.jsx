import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaDiscord, FaEye } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
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

function MovieDetailsModal({ movie, handleModalClose }) {
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

  const { submittedby, dateAdded } = movie.otherDetails;

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
              <div className="flex flex-row ">
                <TrailerModal buttonText={"Play Trailer"} url={trailer} />
              </div>
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
                  <span className="text-base"> {language} </span>
                </li>
              </ul>
            </div>
            <div className="flex">
              <ul className="">
                <li className="text-3xl">
                  <a>
                    <FaDiscord />
                  </a>
                </li>
                <li>
                  <a>
                    <FaEye />
                  </a>
                </li>
                <li>
                  <a></a>
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
              <span>
                Cast
                <p>{actors}</p>
              </span>
              <span>
                Genres <p>{genre}</p>
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetailsModal;
