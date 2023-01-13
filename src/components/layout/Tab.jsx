import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteCollection } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  boxShadow: 24,
  p: 4,
};
function Tab({ TabName }) {
  const { dispatch, activeCollection } = useContext(MovieDBContext);
  const [hovering, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const isActive = activeCollection === TabName;

  const handleClick = () => {
    dispatch({ type: "SET_ACTIVE_COLLECTION", payload: TabName });
  };

  const handleDelete = () => {
    deleteCollection(activeCollection);
    window.location.reload();
  };
  return (
    <div
      className={`btn btn-md ${isActive && "tab-active"} `}
      onMouseOver={() => isActive && setHover(true)}
      onMouseOut={() => isActive && setHover(false)}
    >
      <div className="flex justify-between">
        <button onClick={handleClick}>{TabName}</button>

        <div className="pl-3">
          {hovering && (
            <div className="tooltip" data-tip="Delete">
              <label
                className="btn btn-circle btn-sm btn-error z-20"
                onClick={handleModalOpen}
              >
                <FaTrash />
              </label>
            </div>
          )}
          <Modal
            open={showModal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="hero" style={style}>
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div className="card-body">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Are you sure?</span>
                      </label>
                      <p className="text-warning">
                        This action cannot be undone!
                      </p>
                    </div>

                    <div className="form-control mt-6">
                      <button
                        className="btn btn-error normal-case btn-sm"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

Tab.defaultProps = {
  TabName: "Untitled",
};

export default Tab;
