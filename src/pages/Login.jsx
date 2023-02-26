import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { getAuthentication, loginUser } from '../context/moviedb/MovieDBActions';
import MovieDBContext from "../context/moviedb/MovieDBContext";


function Login() {
  const {dispatch} = useContext(MovieDBContext)
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(text);
    getAuthentication().then((isAuthenticated) => {
      dispatch({
        type: "AUTHENTICATE_USER",
        payload: isAuthenticated,
      });
      console.log("is Authenticated", isAuthenticated);
    });
    // window.location.reload();
    setText("");
  };

  return (
    <div>
      <form className="form-control w-full max-w-xs" onSubmit={onSubmit}>
        <label className="label">
          <span className="label-text">What is the super secret code? 👀</span>
        </label>
        <input
          type="password"
          placeholder="Type the super secret code here ..."
          className="input input-bordered w-full max-w-xs"
          value={text}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Login