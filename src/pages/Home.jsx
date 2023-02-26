import { useContext, useEffect} from "react";
import ItemDatabaseNavbar from "../components/layout/PickerWheelMenuNavbar";
import PickerWheelMenu from "../components/PickerWheelMenu";
import UserCarousel from "../components/Users/UserCarousel";
import {
  getAuthentication,
  getCollections,
  getMoviesFromStorage,
  getUsers,
} from "../context/moviedb/MovieDBActions";
import MovieDBContext from "../context/moviedb/MovieDBContext";
import Login from "./Login";


function Home() {
  const { dispatch, activeCollection, isAuthenticated } = useContext(MovieDBContext);

  useEffect(() => {
    getCollections().then((collections) => {
      dispatch({ type: "SET_COLLECTIONS_ARRAY", payload: collections });
    });

    const storedActiveCollection = localStorage.getItem("active_collection");
    if (storedActiveCollection) {
      dispatch({
        type: "SET_ACTIVE_COLLECTION",
        payload: storedActiveCollection,
      });
    }

    getMoviesFromStorage(activeCollection).then((movies) => {
      dispatch({
        type: "SET_MOVIESTORAGE",
        payload: movies,
      });
    });

    getUsers().then((users) => {
      dispatch({ type: "SET_USERS", payload: users });
    });

    getAuthentication().then((isAuthenticated) => {
      console.log("is Authenticated", isAuthenticated);
      dispatch({
        type: "AUTHENTICATE_USER",
        payload: isAuthenticated,
      });
    })

  }, [dispatch, activeCollection]);

  return (
    <div className="h-full">
      {isAuthenticated ? (
        <>
          <div>
            <ItemDatabaseNavbar />
          </div>
          <div>
            <PickerWheelMenu />
          </div>
          <UserCarousel />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
