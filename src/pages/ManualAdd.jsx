import React, { useState } from "react";
import { addCustomEntry } from "../context/moviedb/MovieDBActions";


function ManualAdd() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [user, setUser] = useState("");

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onLinkChanged = (e) => {
    setLink(e.target.value);
  };
  const onUserChanged = (e) => {
    setUser(e.target.value);
  };
  const handleAdd = () =>{
    const entry = {
        title,
        link,
        user
    }
    addCustomEntry(entry);
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={onTitleChanged}
                placeholder="Type title here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Link</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={onLinkChanged}
                placeholder="Type link here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">User</span>
              </label>
              <input
                type="text"
                value={user}
                onChange={onUserChanged}
                placeholder="Discord ID"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualAdd;
