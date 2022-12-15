import { useContext, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { getMovies } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";

function MovieSearch() {
  const [text, setText] = useState("");
  const { movies, dispatch } = useContext(MovieDBContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      const movies = await getMovies(text);
      dispatch({ type: "SET_LOADING" });
      dispatch({ type: "GET_MOVIES", payload: movies });
      setText("");
    }
  };
  return (
    <div className="grid grid-cols-1 md-8 gap-8 justify-start ">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
              <input
                type="text"
                className="w-full pr-40 bg-base-300 bg-opacity-70 input-lg rounded-full"
                placeholder="Look for a movie"
                value={text}
                onChange={handleChange}
              />
              <button
                className="absolute right-0 top-0 rounded-l-none rounded-r-full w-36 btn btn-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primary duration-300"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

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
    </div>
  );
}

export default MovieSearch;
