import { Box, Modal } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import UserDetails from "./UserDetails";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserCard({user}) {

  
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const { username, rating, userImage } = user;

  return (
    <div
      className="card bg-base-100 shadow-xl h-full btn"
      onClick={handleModalOpen}
    >
      <div class="avatar m-auto p-5 pb-1">
        <div class="w-32 rounded-full">
          <img src={userImage} alt="userImage" />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{username}</h2>
        <div className="card-actions">
          <div>
            <div>
              <Box>
                <StyledRating
                  readOnly
                  name="hover-feedback"
                  value={rating}
                  size="large"
                  precision={0.5}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "grey" }}
                      fontSize="inherit"
                    />
                  }
                />
              </Box>
            </div>
            <div className="py-1">
              <div className="badge badge-accent badge-outline badge-lg">
                {rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <UserDetails user={user}/>
        </div>
      </Modal>
    </div>
  );
}

export default UserCard;
