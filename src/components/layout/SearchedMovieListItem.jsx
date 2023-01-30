import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import {
  addMovieToStorage,
  getDetailedMovie,
} from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import TrailerModal from "./TrailerModal";

function SearchedMovieListItem({ movie, addItem }) {
  const [movieDetails, SetMovieDetails] = useState({});
  const [moreDetails, SetMoreDetails] = useState({});
  const [text, setText] = useState("");

  const fetchMovieDetails = async () => {
    const data = await getDetailedMovie(movie);
    SetMovieDetails(data);
  };

  const onAddClicked = async () => {
    await addMovieToStorage(movieDetails, text).then((response) => {
      addItem(response);
    });
  };

  const handleChange = (e) => setText(e.target.value);

  useEffect(() => {
    fetchMovieDetails();

    const fetchData = async () => {
      const mdbList = axios.create({
        baseURL: "https://mdblist.p.rapidapi.com/",
        params: { i: `${movie.imdbID}` },
        headers: {
          "X-RapidAPI-Key":
            "e727007857mshc26c548468a87f4p1952bejsnab5b0a0f6358",
          "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
        },
      });

      await mdbList.get().then((response) => {
        SetMoreDetails(response.data);
      });
    };

    fetchData();
  }, []);

  const { Title, Year, Poster } = movieDetails;
  const { trailer } = moreDetails;
  return (
    <div className="flex flex-row bg-neutral m-2 rounded-xl text-base-100">
      <div className="text-center">
        <div className="relative">
          {trailer && (
            <div className="absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto flex items-center justify-center bg-neutral bg-opacity-60 h-[100%] w-[100%]">
              <TrailerModal url={trailer} buttonText={<FaPlay />} />
            </div>
          )}
          <img src={Poster} alt="poster" className="w-[6rem] h-[7rem]" />
        </div>
      </div>

      <div className="p-5 flex w-full ">
        <div className="flex-1">
          <h1 className="font-bold text-xl">{Title}</h1>
          <p className="">{Year}</p>
        </div>

        <div className="">
          <input
            type="text"
            placeholder="Contributer Username"
            className="input input-bordered text-black bg-base-200"
            value={text}
            onChange={handleChange}
          />
          <button
            className={`btn btn-outline btn-primary ${text.length <= 3 ? 'btn-disabled opacity-50 btn-error' : ''}`}
            onClick={onAddClicked}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchedMovieListItem;
