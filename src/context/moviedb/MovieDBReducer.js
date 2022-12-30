const MovieDBReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case "GET_MOVIE":
      return {
        ...state,
        movies: action.payload.movie,
        loading: false,
      };
    case "GET_MOVIE_DETAILS":
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_MOVIES":
      return {
        ...state,
        movies: [],
        isSearching: false,
      };
    case "SET_MOVIESTORAGE":
      return {
        ...state,
        movieStorage: action.payload,
      };
    case "GET_MOVIE_FROM_STORAGE":
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case "SET_SEARCHING_MODE":
      return {
        ...state,
        isSearching: action.payload,
      };
    default:
      return state;
  }
};
export default MovieDBReducer;
