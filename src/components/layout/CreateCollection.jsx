import { Modal } from "@mui/material";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  boxShadow: 24,
  p: 4,
};

function CreateCollection({
  handleModalOpen,
  handleModalClose,
  showModal,
  handleCreate,
}) {
  const [collectionName, setCollectionName] = useState("");

  const onCollectionNameChanged = (e) => {
    setCollectionName(e.target.value);
  };

  const handleClose = () => {
    handleModalClose();
  };

  const handleAdd = () => {
    if (collectionName === "") {
      alert("Please enter a name");
    } else {
      handleCreate(collectionName);
      handleClose();
      window.location.reload();
    }
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-circle normal-case btn-sm btn-accent"
        onClick={handleModalOpen}
      >
        <FaPlus />
      </button>
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
                    <span className="label-text">Collection Name</span>
                  </label>
                  <input
                    type="text"
                    value={collectionName}
                    onChange={onCollectionNameChanged}
                    placeholder="Type collection name here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary normal-case btn-sm"
                    onClick={handleAdd}
                  >
                    Create Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateCollection;
