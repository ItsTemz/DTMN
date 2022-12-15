import React from 'react'
import PropTypes from "prop-types";
import { FaFilter, FaSort } from "react-icons/fa";
import { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

function MovieLibraryNavbar({ numberOfMovies, searchMovie, resetSearchedMovie, applyFilter, sortBy}) {

    const [text, setText] = useState("");
    const { setAlert } = useContext(AlertContext);


    const handleChange = (e) => {
        setText(e.target.value);
        searchMovie(e.target.value); 
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (text === "") {
        setAlert("Please enter something", "error");
      } else {
        setText("");
      }
    };

  return (
    <div className="navbar bg-base-100 shadow-2xl my-1 rounded-lg z-20">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Movie Library ({numberOfMovies})
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <form onSubmit={handleSubmit} className ="p-0 m-0">
              <div className="form-control py-1 m-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered"
                  value={text}
                  onChange={handleChange}
                />
              </div>
            </form>
          </li>
          <li tabIndex={0}>
            <a>
              Filter
              <FaFilter />
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
          <li tabIndex={0}>
            <a>
              Sort
              <FaSort />
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

MovieLibraryNavbar.defaultProps = {
  numberOfMovies: 0,
};

MovieLibraryNavbar.propTypes = {
  numberOfMovies: PropTypes.number,
};

export default MovieLibraryNavbar