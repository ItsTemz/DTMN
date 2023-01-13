import React from 'react'
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Carousel from "better-react-carousel";
import MovieLibraryItem from '../MovieLibrary/MovieLibraryItem';

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));


function UserDetails({user}) {
  const { username, userTitle, userImage, rating, addedMovies } = user;
  return (
    <div className="card w-[100%] h-[100%] bg-base-100 shadow-xl">
      <div class="avatar m-auto p-5 pb-1">
        <div class="w-[100%] rounded-full">
          <img src={userImage} alt="userImage" />
        </div>
      </div>
      <div className="card-body">
        <div className="">
          <div className="flex justify-between">
            <h2 className="font-bold text-xl card-title">{username}</h2>
            <div className="h-full flex text-center justify-center">
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

        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Movies Added</div>
            <div className="stat-value">{addedMovies.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Title</div>
            <div className="stat-value">{userTitle}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="h-full w-full bg-base-300">
            <Carousel cols={4} rows={1} gap={10} loop>
              {addedMovies.map((movie)=>{
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
  );
}

export default UserDetails