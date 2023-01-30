import { useContext, useState } from "react";
import { getMovies } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function NavbarMovieSearch() {
  const [text, setText] = useState("");
  const { movies, dispatch } = useContext(MovieDBContext);

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
    }
  };

  return (
    <form>
      <div className="form-control flex flex-row">
        <div className="">
          <input
            type="text"
            placeholder="Add a new movie"
            className="input input-bordered"
            value={text}
            onChange={handleChange}
          />
          {movies.length > 0 ? (
            <button
              onClick={() => {
                dispatch({ type: "CLEAR_MOVIES" });
                setText("");
              }}
              className="btn m-1 btn-outline btn-error"
            >
              Clear
            </button>
          ) : (
            <button
              className="btn m-1 btn-outline btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Search
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default NavbarMovieSearch;
