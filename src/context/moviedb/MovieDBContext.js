import { createContext , useReducer} from "react";
import MovieDBReducer from "./MovieDBReducer";

const MovieDBContext = createContext();

export const MovieDBProvider = ({children}) => {
    const initialState = {
      movies: [],
      movie: {},
      calls: 0,
      loading: false,
      isSearching: false,
      movieStorage: [],
      displayItems: [],
      collectionsArray: [],
      activeCollection: localStorage.getItem("active_collection") || 'Movie',
      users: [],
      isAuthenticated: false
    };
    const [state, dispatch] = useReducer(MovieDBReducer, initialState);

    return <MovieDBContext.Provider value={
        {
            ...state,
            dispatch,
        }
    }>
        {children}
    </MovieDBContext.Provider>
}

export default MovieDBContext;