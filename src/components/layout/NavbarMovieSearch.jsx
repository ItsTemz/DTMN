import { useContext, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { getMovies } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import MovieItem from "../movies/MovieItem";

function NavbarMovieSearch() {
  const [text, setText] = useState("");
  const { loading, movies, dispatch } = useContext(MovieDBContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Please enter something");
    } else {
      const movies = await getMovies(text);
      dispatch({ type: "SET_LOADING" });
      dispatch({ type: "SET_SEARCHING_MODE", payload: true });
      dispatch({ type: "GET_MOVIES", payload: movies });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Add a new movie"
            className="input input-bordered"
            value={text}
            onChange={handleChange}
          />
          {movies.length > 0 && (
            <div className="flex my-auto">
              <button
                onClick={() => dispatch({ type: "CLEAR_MOVIES" })}
                className="btn btn-ghost btn-sm"
              >
                Clear
              </button>
            </div>
          )}
          <button className="btn m-1" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default NavbarMovieSearch;
