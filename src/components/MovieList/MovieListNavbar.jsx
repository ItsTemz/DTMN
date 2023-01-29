import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ManualAdd from "../../pages/ManualAdd";
import NavbarMovieSearch from "../layout/NavbarMovieSearch";

function ListNavbar({ numOfItems }) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="navbar bg-neutral w-full rounded-lg">
      <div className="flex-1">
        <Link
          className="btn btn-ghost btn-secondary text-base-100 normal-case text-xl"
          to="/movielibrary"
        >
          Library ({numOfItems})
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <label className="input-group">
            <NavbarMovieSearch />

            <div
              className="tooltip tooltip-top tooltip-accent"
              data-tip="Add Custom Entry"
            >
              <button
                className="btn btn-circle btn-3xl"
                onClick={handleModalOpen}
              >
                <FaPlus />
              </button>
              {showModal && (
                <ManualAdd
                  handleModalClose={handleModalClose}
                  showModal={showModal}
                />
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ListNavbar;
