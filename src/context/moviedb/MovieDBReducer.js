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
    case "UPDATE_STORAGE_UI":
      return {
        ...state,
        displayItems: action.payload,
      };
    case "INIT_STORAGE_UI":
      return {
        ...state,
        displayItems: action.payload,
      };
    case "SET_ACTIVE_COLLECTION":
      localStorage.setItem("active_collection", action.payload);
      return {
        ...state,
        activeCollection: action.payload,
      };
    case "SET_COLLECTIONS_ARRAY":
      return {
        ...state,
        collectionsArray: action.payload,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETE_COLLECTION":
      return {
        ...state,
        collectionsArray: [
          state.collectionsArray.filter(() =>
            state.collectionsArray.includes(action.payload)
          ),
        ],
      };
    default:
      return state;
  }
};
export default MovieDBReducer;
