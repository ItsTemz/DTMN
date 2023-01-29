import Carousel from "better-react-carousel";
import React, { useContext } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import UserCard from "./UserCard";

function UserCarousel() {
  const { users } = useContext(MovieDBContext);

  return (
    <div className="p-4 space-x-4 bg-neutral bg-opacity-50 rounded-box w-full my-5">
      <Carousel cols={5} rows={1} gap={10} showDots>
        {users
          .sort((a, b) => b.rating - a.rating)
          .map((user, index) => {
            return (
              <Carousel.Item key={user._id}>
                <UserCard user={user} index={index} />
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}

export default UserCarousel;
