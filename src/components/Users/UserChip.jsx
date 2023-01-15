import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react'
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

function UserChip({username}) {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1}>
      <Chip
        avatar={
          <Avatar alt="Natacha" src="https://placeimg.com/192/192/people" />
        }
        label={`${username}`}
        variant="outlined"
        color="primary"
      />
    </Stack>
    </ThemeProvider>
  );
}

export default UserChip
