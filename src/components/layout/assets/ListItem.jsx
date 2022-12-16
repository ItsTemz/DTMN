import PropTypes from "prop-types";
import React, { useState } from "react";

function ListItem({ itemName, filterItemClicked }) {
  const [selected, setSelected] = useState(false);
  const [className, setClassName] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (selected) {
      //deselect
      filterItemClicked(null);
      setSelected(false);
      setClassName("");
    } else {
      //select
      filterItemClicked(itemName);
      setSelected(true);
      setClassName("bordered");
    }
  };

  return (
    <li className={className}>
      <button onClick={handleClick}>{itemName}</button>
    </li>
  );
}

ListItem.defaultProps = {
  itemName: "List Item",
};

ListItem.propTypes = {
  itemName: PropTypes.string,
};

export default ListItem;
