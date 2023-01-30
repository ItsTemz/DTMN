import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { rateUser } from "../../context/moviedb/MovieDBActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

function RateUserModal({ user, setUserScore }) {
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRatingChange = (newValue) => {
    setRatingValue(newValue);
  };
  const handleSubmit = () => {
    rateUser(user, ratingValue);
    handleClose();
  };

  const { username, userImage } = user;

  return (
    <div>
      <div>
        <button
          onClick={handleOpen}
          className="btn btn-outline btn-2xl btn-secondary mx-2"
        >
          Rate {username && username}
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              ...style,
            }}
          >
            <div className="flex bg-neutral p-5 rounded-full text-base-100">
              <div className="avatar">
                <div className="rounded-full">
                  <img src={userImage} alt="avatar" />
                </div>
              </div>

              <div className="card w-full shadow-xl ">
                <div className="card-body">
                  <h2 className="card-title">
                    Give <span className="text-accent">{username}</span> a
                    score.
                  </h2>
                  <div className="flex text-2xl py-2">
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
                        onChange={(e, newValue) => handleRatingChange(newValue)}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.7, color: "grey" }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="flex mx-auto my-auto w-[40%] justify-around">
                <button
                  className="btn btn-outline btn-primary mx-0"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="btn btn-error btn-circle"
                  onClick={handleClose}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default RateUserModal;
