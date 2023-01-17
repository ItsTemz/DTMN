import React from 'react'
import { createBoard } from '@wixc3/react-board';
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Carousel from "better-react-carousel";
// import MovieLibraryItem from '../MovieLibrary/MovieLibraryItem';

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
        color: theme.palette.action.disabled,
    },
}));
export default createBoard({
    name: 'New Board',
    Board: () => <div>
        <div className="card w-[100%] h-[100%] bg-base-100 shadow-xl">
            <div className="avatar m-auto p-5 pb-1">
                <div className="w-[100%] rounded-full">
                    <img src="https://placeimg.com/192/192/people" alt="userImage" />
                </div>
            </div>
            <div className="card-body">
                <div className="">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-xl card-title">itsTemz</h2>
                        <div className="h-full flex text-center justify-center">
                            <div className="m-auto">
                                <Box>
                                    <StyledRating
                                        readOnly
                                        name="hover-feedback"
                                        value={4.9}
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
                                4.9
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">Movies Added</div>
                        <div className="stat-value">5</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Title</div>
                        <div className="stat-value">itsTemz</div>
                    </div>
                </div>
            </div>
        </div>
    </div>,
    environmentProps: {
        canvasWidth: 306
    }
});
