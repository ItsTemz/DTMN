import React, { useState } from "react";

function PressOnceButton({ onClick, icon }) {
  const [pressed, setPressed] = useState(false);

  const styles = `btn ${pressed && "btn-disabled"}`;
  return (
    <btn
      className={styles}
      onClick={() => {
        onClick();
        setPressed(true);
      }}
    >
      {icon}
    </btn>
  );
}

export default PressOnceButton;
