import React from "react";
import ItemDatabaseNavbar from "../components/layout/PickerWheelMenuNavbar";
import Library from "../components/MovieLibrary/MovieLibrary";

function LibraryPage() {
  return (
    <div>
      <ItemDatabaseNavbar />
      <Library />
    </div>
  );
}

export default LibraryPage;
