import Carousel from "better-react-carousel";
import React from "react";
import { useContext } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import UserCard from "./UserCard";


function UserCarousel() {
  const {users} = useContext(MovieDBContext)

  return (
    <div className="p-4 space-x-4 bg-neutral rounded-box w-full my-5">
      <Carousel cols={5} rows={1} gap={10} showDots>
        {users
          .sort((a, b) => b.rating - a.rating)
          .map((user) => {
            return (
              <Carousel.Item key={user._id}>
                <UserCard user={user} />
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}

export default UserCarousel;
