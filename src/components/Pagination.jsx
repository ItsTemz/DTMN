import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React from "react";

function BasicPagination({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (event, newPage) => {
    event.preventDefault();
    paginate(newPage);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageNumbers.length}
        variant="outlined"
        shape="rounded"
        size="large"
        onChange={handleChange}
        color= 'primary'
        className="w-full flex justify-center bg-base-100 bg-opacity-50 rounded-b-2xl"
      />
    </Stack>
  );
}

export default BasicPagination;
