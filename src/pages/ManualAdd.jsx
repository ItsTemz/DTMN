import Modal from "@mui/material/Modal";
import React, { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import { addCustomEntry } from "../context/moviedb/MovieDBActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  boxShadow: 24,
  p: 4,
};

function ManualAdd({ handleModalClose, showModal }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [user, setUser] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    handleModalClose();
  };

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onLinkChanged = (e) => {
    setLink(e.target.value);
  };
  const onUserChanged = (e) => {
    setUser(e.target.value);
  };
  const handleAdd = () => {
    if (title === "") {
      alert("Please enter a title");
    } else {
      const entry = {
        title,
        link,
        user,
      };
      addCustomEntry(entry);
      handleClose();
    }
    
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="hero" style={style}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={onTitleChanged}
                  placeholder="Type title here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Link</span>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={onLinkChanged}
                  placeholder="Type link here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">User</span>
                </label>
                <input
                  type="text"
                  value={user}
                  onChange={onUserChanged}
                  placeholder="Discord ID"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ManualAdd;
