import React, { useState } from "react";

function PressOnceButton({ onClick, icon }) {
  const [pressed, setPressed] = useState(false);

  const styles = `btn ${pressed && "btn-disabled"}`;
  return (
    <button
      className={styles}
      onClick={() => {
        onClick();
        setPressed(true);
      }}
    >
      {icon}
    </button>
  );
}

export default PressOnceButton;
