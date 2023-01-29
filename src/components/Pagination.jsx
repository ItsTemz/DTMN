import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});
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
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={pageNumbers.length}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handleChange}
          color="primary"
          className="w-full flex justify-center bg-neutral rounded-b-2xl"
        />
      </Stack>
    </ThemeProvider>
  );
}

export default BasicPagination;
