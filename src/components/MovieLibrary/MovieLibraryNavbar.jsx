import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import ListItem from "../../components/layout/assets/ListItem";
import AlertContext from "../../context/alert/AlertContext";
import filterItems from "../layout/assets/FilterScripts";

function LibraryNavbar({
  numberOfMovies,
  searchMovie,
  movieStorage,
  resetSearchedMovie,
  applyFilter,
  sortBy,
}) {
  const [text, setText] = useState("");
  const { setAlert } = useContext(AlertContext);
  const [knownUsers, setKnownUsers] = useState([]);
  const [knownGenres, setKnownGenres] = useState([]);

  useEffect(() => {
    const users = new filterItems(movieStorage);
    setKnownUsers(users.getUsers());

    const movieGenres = new filterItems(movieStorage);
    setKnownGenres(movieGenres.getGenres());
  }, []);

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

  const handleFilterByUser = (user) => {
    applyFilter(user);
  };

  return (
    <div className="navbar bg-neutral shadow-2xl my-1 rounded-lg z-50 text-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Library ({numberOfMovies})
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <form onSubmit={handleSubmit} className="p-0 m-0">
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
            <ul className="p-2 bg-neutral bg-opacity-80">
              <li className="menu-title">
                <span>Users</span>
              </li>

              <li tabIndex={0}>
                <ul className="bg-neutral bg-opacity-90 menu menu-compact w-56 rounded-box">
                  {knownUsers.map((user, index) => (
                    <ListItem
                      key={index}
                      itemName={user}
                      filterItemClicked={handleFilterByUser}
                    />
                  ))}
                </ul>
              </li>

              <li className="menu-title">
                <span>Genres</span>
              </li>
              <li>
                <ul className="bg-neutral bg-opacity-90 menu menu-compact w-56 rounded-box">
                  {knownGenres.map((genre, index) => (
                    <ListItem key={index} itemName={genre} />
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

LibraryNavbar.defaultProps = {
  numberOfMovies: 0,
};

LibraryNavbar.propTypes = {
  numberOfMovies: PropTypes.number,
};

export default LibraryNavbar;
