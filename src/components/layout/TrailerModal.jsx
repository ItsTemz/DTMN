import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TrailerModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className="btn btn-outline btn-2xl">
        {props.buttonText}
      </button>
      <Modal
        open={open}
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <ReactPlayer url={props.url} style={style} controls={true} width='75%' height='75%'/>
        </div>
      </Modal>
    </div>
  );
}

export default TrailerModal;
