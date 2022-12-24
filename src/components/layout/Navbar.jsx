import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus, FaPlusCircle, FaTheaterMasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import ManualAdd from "../../pages/ManualAdd";

function Navbar({ title }) {
  return (
    <div>
      <div className="navbar mb-11 shadow-lg bg-neutral text-neutral-content">
        <div className="navbar-start container mx-auto">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/" className="">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="">
                  Movie library
                </Link>
              </li>
              <li>
                <Link to="/about" className="">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost normal-case text-xl" to="/">
            <FaTheaterMasks className="inline pr-2 text-3xl" />
            {title}
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <Link to="/search" className="btn btn-ghost btn-sm rounderd-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </button>
          {/* Settings Button */}
          <div
            className="tooltip tooltip-bottom tooltip-accent"
            data-tip="Add Custom Entry"
          >
            <Link to="/addEntry" className="btn btn-circle btn-3xl">
              <FaPlus />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
Navbar.defaultProps = {
  title: "Duck Talk Movie Night",
};

Navbar.propTypes = {
  title: PropTypes.string,
};
export default Navbar;
