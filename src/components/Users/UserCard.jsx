import StarIcon from "@mui/icons-material/Star";
import { Box, Modal } from "@mui/material";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import UserDetails from "./UserDetails";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const style = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "50%",
  height: "50%",
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserCard({ user, index }) {
  const [showModal, setShowModal] = useState(false);

  const getBadge = (inIndex) =>{
    if(inIndex === 0){
      return (
        <div className="absolute top-5 right-5 bordered z-10">
          <svg width="75" height="75" className="z-10">
            <text
              x="35"
              y="35"
              fill="gold"
              font-size="52"
              text-anchor="middle"
              dominant-baseline="central"
            >
              #1
            </text>
          </svg>
        </div>
      );
    }
    else if(inIndex === 1){
      return (
        <div className="absolute top-5 right-5 bordered z-10">
          <svg width="75" height="75" className="z-10">
            <text
              x="35"
              y="35"
              fill="silver"
              font-size="52"
              text-anchor="middle"
              dominant-baseline="central"
            >
              #2
            </text>
          </svg>
        </div>
      );
    }
    else if(inIndex === 2){
      return (
        <div className="absolute top-5 right-5 bordered z-10">
          <svg width="75" height="75" className="z-10">
            <text
              x="35"
              y="35"
              fill="bronze"
              font-size="52"
              text-anchor="middle"
              dominant-baseline="central"
            >
              #3
            </text>
          </svg>
        </div>
      );
    }
    else {
      return null;
    }
  }

  useEffect(() =>{


  }, [index])
  
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const { username, rating, userImage } = user;

  return (
    <div
      className="card bg-neutral shadow-xl h-full btn"
      onClick={handleModalOpen}
    >
      {getBadge(index)}
      <div className="avatar m-auto p-5 pb-1">
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
          <UserDetails user={user} />
        </div>
      </Modal>
    </div>
  );
}

export default UserCard;
