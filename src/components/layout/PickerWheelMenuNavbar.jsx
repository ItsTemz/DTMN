import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { createCollection } from "../../context/moviedb/MovieDBActions";
import MovieDBContext from "../../context/moviedb/MovieDBContext";
import CreateCollection from "./CreateCollection";
import Tab from "./Tab";

const titleCase = (str) => str[0].toUpperCase() + str.slice(1);

function ItemDatabaseNavbar() {
  const { dispatch, collectionsArray } = useContext(MovieDBContext);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleCreate = (newCollection) => {
    createCollection(newCollection);
    dispatch({ type: "SET_ACTIVE_COLLECTION", payload: newCollection });
    window.location.reload();
  };

  return (
    <div className="navbar bg-neutral rounded-2xl">
      <div className="tabs tabs-boxed flex flex-row-reverse bg-transparent">
        {collectionsArray.map((collection) => {
          return (
            <Tab key={collection._id} TabName={titleCase(collection.name)} />
          );
        })}
      </div>
      <CreateCollection
        handleModalOpen={handleModalOpen}
        showModal={showModal}
        handleModalClose={handleModalClose}
        handleCreate={handleCreate}
      />
    </div>
  );
}

export default ItemDatabaseNavbar;
