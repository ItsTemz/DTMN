import { useContext, useEffect, useState } from "react";
import ItemDatabaseNavbar from "../components/layout/PickerWheelMenuNavbar";
import PickerWheelMenu from "../components/PickerWheelMenu";
import UserCarousel from "../components/Users/UserCarousel";
import {
  getCollections,
  getMoviesFromStorage,
  getUsers,
} from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";

function Home() {
  const { dispatch, activeCollection } = useContext(MovieDBContext);

  useEffect(() => {
    getCollections().then((collections) => {
      dispatch({ type: "SET_COLLECTIONS_ARRAY", payload: collections });
    });
    getMoviesFromStorage(activeCollection).then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });
    getUsers().then((users) => {
      dispatch({type: "SET_USERS", payload: users});
    });
  }, [dispatch, activeCollection]);

  return (
    <div>
      <div>
        <ItemDatabaseNavbar />
      </div>
      <div>
        <PickerWheelMenu />
      </div>
      <UserCarousel />
    </div>
  );
}

export default Home;
