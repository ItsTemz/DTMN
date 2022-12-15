import {getDetailedMovie, addMovieToStorage} from "../../context/moviedb/MovieDBActions";
import { useContext, useState, useEffect } from "react";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import PropagateLoader from 'react-spinners/PropagateLoader';

function MovieItem({movie}) {
    const {
        calls,
        loading,
        dispatch
    } = useContext(MovieDBContext);
    const [movieDetails , SetMovieDetails] = useState({});

    const fetchMovieDetails = async () => {
        const data = await getDetailedMovie(movie);
        SetMovieDetails(data)
        // console.log("Details;", movieDetails, "calls", calls);
    };

    const onAddClicked = ()=>{
        addMovieToStorage(movieDetails);
    }

    useEffect(()=>{
        fetchMovieDetails();
    },[])

    

    const {
        Title,
        Year,
        Poster,
        imdbID,
        Ratings,
        Genre,
        Runtime,
        Plot
    } = movieDetails;

    // console.log(movieDetails)

    if(!loading) {
        return (
          <div className="card h-[350px] bg-base-100 shadow-2xl flex flex-row lg:max-h-[45vh] md:max-h-[40vh] sm:max-h-[30vh] w-full justify-end">
            <figure className="min-w-[30%] max-w-[35%] h-full">
              <img src={Poster} alt="Movie" />
            </figure>
            <div className="card-body justify-evenly p-4">
              <h2 className="card-title font-bold text-2xl sm:text-xl">
                {Title}
              </h2>
              <div className="divider m-0 " />
              <div className="text-sm my-1 sm:text-sm">
                <span className="font-bold">
                  {Runtime} | {Genre}
                </span>
              </div>
              <div>
                <p className="truncate-overflow sm:text-sm">{Plot}</p>
                <a
                  className="btn btn-xs btn-outline "
                  href={`https://www.imdb.com/title/${imdbID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  More info
                </a>
              </div>
              <div className="my-1">
                <span className="font-bold text-sm">
                  Released:{" "}
                  <span className="font-thin italic text-accent">{Year}</span> |
                  Rated:{" "}
                  <span className="font-thin italic text-accent">{}</span>
                </span>
              </div>
              <div className="divider m-0" />
              <div className="flex flex-col">
                <div className="card-actions justify-between">
                  <div className="flex flex-row justify-evenly">
                    <button className="btn btn-outline btn-secondary">
                      Details
                    </button>
                  </div>
                  <button
                    className="btn btn-primary btn-outline"
                    onClick={onAddClicked}
                  >
                    Add To List
                  </button>
                </div>
              </div>
            </div>
          </div>
        );      
    }else{
        return <PropagateLoader className='text-center mx-auto' color='#6d3a9c'/>
    }
}

export default MovieItem