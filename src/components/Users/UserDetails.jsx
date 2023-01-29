import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import Carousel from "better-react-carousel";
import React from "react";
import MovieLibraryItem from "../MovieLibrary/MovieLibraryItem";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

function UserDetails({ user }) {
  const { username, userTitle, userImage, rating, addedMovies } = user;
  return (
    <div className="card bg-neutral shadow-xl text-base-100">
      <div class="avatar m-auto p-5 pb-1">
        <div class="w-[100%] rounded-full">
          <img src={userImage} alt="userImage" />
        </div>
      </div>
      <div className="card-body flex flex-col mx-10">
        <div className="border rounded-3xl">
          <div className="flex justify-between p-5">
            <h2 className="font-bold text-xl card-title text-center">
              {username}
            </h2>
            <div className="flex text-center ">
              <div className="m-auto">
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
              <div className="badge badge-accent badge-outline badge-lg m-auto ml-2 p-3">
                {rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow bg-neutral text-base-100 my-5 p-5 h-full">
          <div className="stat">
            <div className="stat-title">Movies Added</div>
            <div className="stat-value">{addedMovies.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Title</div>
            <div className="stat-value">{userTitle}</div>
          </div>
        </div>

        <div className="h-full w-full">
          <div className="border border-base-300 rounded-3xl bg-neutral">
            <div className="p-8">
              <Carousel cols={5} rows={2} gap={8} loop>
                {addedMovies.map((movie) => {
                  return (
                    <Carousel.Item>
                      <MovieLibraryItem movie={movie} />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
